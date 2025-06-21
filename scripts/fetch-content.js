const fs = require('fs');
const path = require('path');
const https = require('https');

// 配置
const REPO_OWNER = process.env.CONTENT_REPO_OWNER || 'S0lace11'; // 替换为你的GitHub用户名
const REPO_NAME = process.env.CONTENT_REPO_NAME || 'blog-content'; // 私有仓库名
const GITHUB_TOKEN = process.env.CONTENT_REPO_TOKEN;
const CONTENT_DIR = path.join(process.cwd(), 'content');

// GitHub API 基础URL
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * 发起GitHub API请求
 */
function githubRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Portfolio-Content-Fetcher',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * 下载文件内容（带超时机制）
 */
function downloadFile(downloadUrl) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Portfolio-Content-Fetcher'
      },
      timeout: 30000 // 30秒超时
    };

    const handleResponse = (res) => {
      if (res.statusCode === 302 && res.headers.location) {
        // 处理重定向
        const redirectReq = https.get(res.headers.location, (redirectRes) => {
          let data = '';
          redirectRes.on('data', (chunk) => data += chunk);
          redirectRes.on('end', () => resolve(data));
          redirectRes.on('error', reject);
        });
        redirectReq.on('error', reject);
        redirectReq.setTimeout(30000, () => {
          redirectReq.destroy();
          reject(new Error('下载超时（重定向）'));
        });
      } else if (res.statusCode >= 200 && res.statusCode < 300) {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
        res.on('error', reject);
      } else {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
      }
    };

    const req = https.get(downloadUrl, options, handleResponse);
    
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('下载超时'));
    });
  });
}

/**
 * 判断是否应该跳过某个文件
 */
function shouldSkipFile(fileName) {
  const skipPatterns = [
    '.DS_Store',           // macOS系统文件
    'Thumbs.db',          // Windows系统文件
    '.gitignore',         // Git配置文件
    '.gitkeep',           // Git保持文件
    'desktop.ini',        // Windows系统文件
    '._*',                // macOS资源分叉文件
    '.*.swp',             // Vim临时文件
    '.*.tmp',             // 临时文件
    '~$*',                // Office临时文件
    'README.md',          // 暂时跳过README文件（如果有下载问题）
  ];
  
  return skipPatterns.some(pattern => {
    if (pattern.includes('*')) {
      // 处理通配符模式
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
      return regex.test(fileName);
    }
    return fileName === pattern;
  });
}

/**
 * 递归获取仓库内容
 */
async function fetchRepoContents(path = '') {
  const endpoint = `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  
  try {
    console.log(`📂 正在获取: ${path || '根目录'}`);
    const contents = await githubRequest(endpoint);
    
    if (!Array.isArray(contents)) {
      // 单个文件
      return [contents];
    }
    
    const allFiles = [];
    
    for (const item of contents) {
      if (item.type === 'file') {
        // 过滤掉系统文件和不需要的文件
        if (shouldSkipFile(item.name)) {
          console.log(`⏭️  跳过文件: ${item.name}`);
          continue;
        }
        allFiles.push(item);
      } else if (item.type === 'dir' && !item.name.startsWith('.') && item.name !== 'drafts') {
        // 递归获取子目录，但跳过隐藏目录和草稿目录
        const subFiles = await fetchRepoContents(item.path);
        allFiles.push(...subFiles);
      }
    }
    
    return allFiles;
  } catch (error) {
    console.error(`❌ 获取 ${path} 失败:`, error.message);
    throw error;
  }
}

/**
 * 确保目录存在
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 创建目录: ${dirPath}`);
  }
}

/**
 * 保存文件到本地（带重试机制）
 */
async function saveFile(file, retryCount = 3) {
  const localPath = path.join(CONTENT_DIR, file.path);
  const localDir = path.dirname(localPath);
  
  // 确保目录存在
  ensureDir(localDir);
  
  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      console.log(`💾 下载文件: ${file.path} (尝试 ${attempt}/${retryCount})`);
      const content = await downloadFile(file.download_url);
      
      // 检查内容是否为空
      if (!content || content.length === 0) {
        throw new Error('下载的文件内容为空');
      }
      
      fs.writeFileSync(localPath, content, 'utf8');
      console.log(`✅ 保存成功: ${localPath} (${content.length} 字符)`);
      return; // 成功则退出重试循环
      
    } catch (error) {
      console.error(`❌ 下载失败 ${file.path} (尝试 ${attempt}/${retryCount}):`, error.message);
      
      if (attempt === retryCount) {
        // 最后一次尝试失败，抛出错误
        throw new Error(`下载文件失败 ${file.path}: ${error.message}`);
      }
      
      // 等待一段时间后重试
      const waitTime = attempt * 1000; // 递增等待时间
      console.log(`⏳ 等待 ${waitTime}ms 后重试...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始获取博客内容...');
  
  // 验证必要的环境变量
  if (!GITHUB_TOKEN) {
    console.error('❌ 错误: 缺少 CONTENT_REPO_TOKEN 环境变量');
    process.exit(1);
  }
  
  try {
    // 清理并重新创建内容目录
    if (fs.existsSync(CONTENT_DIR)) {
      fs.rmSync(CONTENT_DIR, { recursive: true, force: true });
      console.log('🗑️  清理旧内容');
    }
    ensureDir(CONTENT_DIR);
    
    // 获取所有文件
    console.log(`📡 连接到仓库: ${REPO_OWNER}/${REPO_NAME}`);
    const files = await fetchRepoContents();
    
    console.log(`📋 找到 ${files.length} 个文件`);
    
    // 下载所有文件
    let successCount = 0;
    let failedFiles = [];
    
    for (const file of files) {
      try {
        await saveFile(file);
        successCount++;
      } catch (error) {
        console.error(`⚠️  跳过文件 ${file.path}: ${error.message}`);
        failedFiles.push(file.path);
        // 不抛出错误，继续处理其他文件
      }
    }
    
    console.log(`📊 下载统计: 成功 ${successCount}/${files.length} 个文件`);
    if (failedFiles.length > 0) {
      console.log(`⚠️  失败的文件: ${failedFiles.join(', ')}`);
    }
    
    console.log('🎉 内容获取完成!');
    console.log(`📊 统计: 下载了 ${files.length} 个文件到 ${CONTENT_DIR}`);
    
  } catch (error) {
    console.error('❌ 获取内容失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { main }; 