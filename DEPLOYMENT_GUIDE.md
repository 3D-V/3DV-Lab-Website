# 🚀 HDU-3DV Lab 网站部署指南

本指南将帮助您将网站部署到 `https://github.com/3D-V` 组织。

## 📋 前置要求

1. **GitHub账户**: 确保您有GitHub账户
2. **组织权限**: 确保您是 `3D-V` 组织的成员，并有创建仓库的权限
3. **Git工具**: 安装Git命令行工具或GitHub Desktop

## 🎯 部署步骤

### 方法一：使用GitHub网页界面（推荐）

#### 步骤1: 创建仓库
1. 访问 [https://github.com/3D-V](https://github.com/3D-V)
2. 点击 "New repository" 按钮
3. 仓库名称设置为: `3DV-Lab-Website` 或 `lab-website`
4. 描述: `HDU-3DV Lab Official Website - 杭州电子科技大学三维视觉实验室官方网站`
5. 设置为 **Public** 仓库
6. 勾选 "Add a README file"
7. 点击 "Create repository"

#### 步骤2: 上传文件
1. 在新创建的仓库页面，点击 "uploading an existing file"
2. 将以下文件拖拽到上传区域：
   - `index.html`
   - `styles.css`
   - `script.js`
   - `_config.yml`
   - `.gitignore`
   - `README.md`

3. 在提交信息中输入: `Initial commit: HDU-3DV Lab website`
4. 点击 "Commit changes"

#### 步骤3: 启用GitHub Pages
1. 在仓库页面，点击 "Settings" 选项卡
2. 滚动到 "Pages" 部分
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "main" 分支
5. 文件夹选择 "/ (root)"
6. 点击 "Save"

#### 步骤4: 访问网站
- 等待2-5分钟，网站将在以下地址可用：
- `https://3d-v.github.io/3DV-Lab-Website/`

### 方法二：使用Git命令行

#### 步骤1: 克隆仓库
```bash
# 在3D-V组织下创建仓库后，克隆到本地
git clone https://github.com/3D-V/3DV-Lab-Website.git
cd 3DV-Lab-Website
```

#### 步骤2: 复制文件
```bash
# 将网站文件复制到仓库目录
# 从当前目录复制所有网站文件
```

#### 步骤3: 提交并推送
```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: HDU-3DV Lab website"

# 推送到GitHub
git push origin main
```

#### 步骤4: 启用GitHub Pages
按照方法一的步骤3启用GitHub Pages

### 方法三：使用GitHub Desktop

#### 步骤1: 创建仓库
1. 打开GitHub Desktop
2. 点击 "File" → "New repository"
3. 名称: `3DV-Lab-Website`
4. 描述: `HDU-3DV Lab Official Website`
5. 选择本地路径
6. 勾选 "Initialize this repository with a README"
7. 点击 "Create repository"

#### 步骤2: 发布到GitHub
1. 点击 "Publish repository"
2. 确保选择 "3D-V" 组织
3. 取消勾选 "Keep this code private"
4. 点击 "Publish repository"

#### 步骤3: 添加文件
1. 将网站文件复制到仓库文件夹
2. 在GitHub Desktop中查看更改
3. 输入提交信息: `Add HDU-3DV Lab website files`
4. 点击 "Commit to main"
5. 点击 "Push origin"

#### 步骤4: 启用GitHub Pages
按照方法一的步骤3启用GitHub Pages

## ⚙️ 配置说明

### _config.yml 配置
```yaml
title: "HDU-3DV Lab | 杭州电子科技大学三维视觉实验室"
description: "杭州电子科技大学三维视觉实验室官方网站"
url: "https://3d-v.github.io"
baseurl: "/3DV-Lab-Website"
```

### 自定义域名（可选）
如果您有自定义域名：
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为您的域名，如: `lab.3dv.org`
3. 在域名DNS设置中添加CNAME记录指向 `3d-v.github.io`

## 🔧 维护和更新

### 更新网站内容
1. 直接在GitHub网页编辑文件
2. 或者本地修改后推送到仓库
3. GitHub Pages会自动重新部署

### 监控部署状态
1. 在仓库页面点击 "Actions" 选项卡
2. 查看 "pages build and deployment" 工作流状态
3. 绿色✅表示部署成功，红色❌表示部署失败

## 🌐 访问地址

部署成功后，网站将在以下地址可用：
- **主要地址**: `https://3d-v.github.io/3DV-Lab-Website/`
- **备用地址**: `https://3d-v.github.io/lab-website/` (如果仓库名为lab-website)

## 🔍 故障排除

### 常见问题

1. **网站无法访问**
   - 检查GitHub Pages是否已启用
   - 确认分支设置正确（main分支）
   - 等待5-10分钟让部署完成

2. **样式显示异常**
   - 检查CSS文件路径是否正确
   - 确认所有文件都已上传

3. **JavaScript功能不工作**
   - 检查浏览器控制台是否有错误
   - 确认script.js文件已正确上传

### 联系支持
如遇到技术问题，请联系：
- 实验室邮箱: 3dvlab@hdu.edu.cn
- GitHub Issues: 在仓库中创建Issue

## 📊 网站统计

部署后可以添加以下统计工具：
- Google Analytics
- GitHub Pages访问统计
- 百度统计

## 🔒 安全注意事项

1. 不要在代码中包含敏感信息
2. 定期更新依赖项
3. 监控仓库的访问权限

---

🎉 **恭喜！** 按照以上步骤，您的HDU-3DV Lab网站将成功部署到GitHub Pages！
