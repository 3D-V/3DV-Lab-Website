# 🔧 GitHub Pages 故障排除指南

## 🚨 当前问题
访问 `https://hdu-3dv.github.io/` 时显示 "There isn't a GitHub Pages site here."

## 🔍 可能的原因和解决方案

### 1. GitHub Pages 设置问题

#### 检查步骤：
1. 访问 [仓库设置页面](https://github.com/hdu-3dv/hdu-3dv.github.io/settings/pages)
2. 确认以下设置：
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: / (root)

#### 如果设置不正确：
- 选择正确的分支和文件夹
- 点击 "Save" 保存设置
- 等待 5-10 分钟让部署生效

### 2. 权限问题

#### 检查组织权限：
1. 确认您是 hdu-3dv 组织的成员
2. 确认有 Pages 部署权限
3. 检查仓库是否为 Public（GitHub Pages 免费版需要公开仓库）

#### 解决方法：
- 联系组织管理员检查权限
- 确保仓库设置为 Public

### 3. GitHub Actions 工作流问题

#### 检查 Actions：
1. 访问 [Actions 页面](https://github.com/hdu-3dv/hdu-3dv.github.io/actions)
2. 查看是否有失败的工作流
3. 检查部署状态

#### 如果 Actions 失败：
- 查看错误日志
- 重新运行失败的工作流
- 检查权限设置

### 4. 文件结构问题

#### 确认文件存在：
- ✅ `index.html` 在根目录
- ✅ `styles.css` 在根目录
- ✅ `script.js` 在根目录
- ✅ `images/` 文件夹存在

#### 当前文件结构：
```
hdu-3dv.github.io/
├── .github/
│   └── workflows/
│       └── pages.yml
├── images/
│   └── qin_feiwei_photo.png
├── index.html
├── styles.css
├── script.js
├── _config.yml
└── README.md
```

### 5. 域名和URL问题

#### 正确的访问地址：
- **主地址**: `https://hdu-3dv.github.io/`
- **备用检查**: `https://github.com/hdu-3dv/hdu-3dv.github.io`

#### 常见错误：
- 使用了错误的组织名称
- 使用了错误的仓库名称
- URL 大小写敏感问题

### 6. 缓存问题

#### 清除缓存：
1. 强制刷新浏览器 (Ctrl+F5 或 Cmd+Shift+R)
2. 清除浏览器缓存
3. 尝试无痕模式访问
4. 尝试不同的浏览器

### 7. GitHub Pages 服务状态

#### 检查 GitHub 状态：
- 访问 [GitHub Status](https://www.githubstatus.com/)
- 检查 Pages 服务是否正常

## 🛠️ 立即尝试的解决方案

### 方案 1: 重新配置 Pages
1. 进入仓库设置
2. 在 Pages 部分选择 "None"
3. 保存设置
4. 等待 1 分钟
5. 重新选择 "Deploy from a branch" → "main" → "/ (root)"
6. 保存并等待部署

### 方案 2: 手动触发部署
1. 进入 Actions 页面
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow"
4. 等待部署完成

### 方案 3: 检查仓库可见性
1. 进入仓库设置
2. 滚动到底部的 "Danger Zone"
3. 确认仓库是 Public
4. 如果是 Private，点击 "Change visibility" 改为 Public

### 方案 4: 创建简单测试页面
创建一个简单的 `test.html` 文件来测试：
```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Page</title>
</head>
<body>
    <h1>GitHub Pages Test</h1>
    <p>If you can see this, Pages is working!</p>
</body>
</html>
```

## 📞 获取帮助

如果以上方案都无效，请：

1. **检查 GitHub 文档**: [GitHub Pages 文档](https://docs.github.com/en/pages)
2. **联系组织管理员**: 确认权限和设置
3. **GitHub 支持**: 如果是 GitHub 服务问题
4. **实验室技术支持**: qinfeiwei@hdu.edu.cn

## 🔄 状态检查清单

- [ ] 仓库是 Public
- [ ] Pages 设置正确 (main branch, root folder)
- [ ] index.html 文件存在
- [ ] 没有 Actions 错误
- [ ] 等待了足够的部署时间 (5-10分钟)
- [ ] 清除了浏览器缓存
- [ ] 尝试了不同的浏览器/设备

## 📈 预期结果

成功部署后，访问 `https://hdu-3dv.github.io/` 应该显示：
- HDU-3DV Lab 主页
- 秦飞巍教授的照片和详细信息
- 完整的实验室介绍
- 响应式设计，适配各种设备

---

**更新时间**: 2024年12月  
**维护**: HDU-3DV Lab 技术团队
