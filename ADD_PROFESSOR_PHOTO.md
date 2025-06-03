# 📸 添加秦飞巍教授个人照片指南

## 🎯 目标

将秦飞巍教授的个人照片添加到网站中，替换当前的占位符图标。

## 📁 准备照片文件

### 推荐规格
- **格式**: JPG, PNG, WebP
- **尺寸**: 300x300像素 或 400x400像素（正方形）
- **文件大小**: 小于500KB
- **质量**: 高清晰度，专业照片

### 文件命名
建议将照片文件命名为：
- `qin_feiwei_photo.jpg`
- `professor_qin.png`
- `qin_profile.jpg`

## 🔧 添加照片的方法

### 方法一：直接替换HTML（推荐）

1. **上传照片文件**
   ```bash
   # 将照片文件放入网站根目录或创建images文件夹
   mkdir images
   # 复制照片到images文件夹
   ```

2. **修改HTML代码**
   在 `index.html` 文件中找到以下代码：
   ```html
   <div class="member-image professor-photo">
       <div class="photo-placeholder">
           <i class="fas fa-user-tie"></i>
           <span class="photo-label">秦飞巍教授</span>
       </div>
   </div>
   ```

   替换为：
   ```html
   <div class="member-image professor-photo">
       <img src="images/qin_feiwei_photo.jpg" alt="秦飞巍教授" class="professor-img">
   </div>
   ```

3. **添加CSS样式**
   在 `styles.css` 文件中添加：
   ```css
   .professor-img {
       width: 100%;
       height: 100%;
       object-fit: cover;
       border-radius: 50%;
   }
   ```

### 方法二：使用GitHub上传

1. **在GitHub仓库中创建images文件夹**
   - 进入 `https://github.com/3D-V/3DV-Lab-Website`
   - 点击 "Create new file"
   - 输入 `images/README.md` 创建文件夹

2. **上传照片文件**
   - 进入images文件夹
   - 点击 "Upload files"
   - 拖拽照片文件上传

3. **修改HTML文件**
   - 编辑 `index.html` 文件
   - 按照方法一的步骤修改代码

### 方法三：使用Base64编码（不推荐）

如果照片文件较小，可以将其转换为Base64编码直接嵌入HTML：

```html
<div class="member-image professor-photo">
    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." alt="秦飞巍教授" class="professor-img">
</div>
```

## 🎨 CSS样式优化

为了确保照片显示效果最佳，建议使用以下CSS样式：

```css
/* 教授照片样式 */
.professor-photo {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #1e40af, #3b82f6);
    position: relative;
    overflow: hidden;
    border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.professor-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
}

.professor-img:hover {
    transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .professor-photo {
        width: 100px;
        height: 100px;
    }
}
```

## 📝 详细介绍部分的照片

如果需要在详细介绍部分也添加照片，可以在 `professor-detail` 区域添加：

```html
<div class="detail-header">
    <div class="professor-avatar">
        <img src="images/qin_feiwei_photo.jpg" alt="秦飞巍教授" class="avatar-img">
    </div>
    <h3>秦飞巍教授 - 详细介绍</h3>
    <p>实验室负责人，IEEE Fellow，浙江省顶尖人才</p>
</div>
```

对应的CSS样式：

```css
.professor-avatar {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #2563eb;
}

.avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

## 🔍 从Word文档提取的图片

如果成功从Word文档中提取到图片，文件会保存在 `extracted_images` 文件夹中：

1. **检查提取的图片**
   ```bash
   ls extracted_images/
   ```

2. **选择最佳照片**
   - 查看所有提取的图片
   - 选择最清晰、最专业的照片
   - 重命名为合适的文件名

3. **处理图片**
   - 裁剪为正方形
   - 调整大小到推荐尺寸
   - 优化文件大小

## ✅ 完成检查清单

- [ ] 照片文件已准备（正方形，高质量）
- [ ] 照片已上传到正确位置
- [ ] HTML代码已修改
- [ ] CSS样式已添加
- [ ] 网站在不同设备上显示正常
- [ ] 照片加载速度正常
- [ ] 图片alt属性已设置（无障碍访问）

## 🚀 部署更新

完成照片添加后：

1. **提交更改**
   ```bash
   git add .
   git commit -m "Add Professor Qin Feiwei's photo"
   git push origin main
   ```

2. **验证网站**
   - 访问 `https://3d-v.github.io/3DV-Lab-Website/`
   - 检查照片是否正确显示
   - 测试响应式效果

## 📞 技术支持

如需帮助，请联系：
- 实验室邮箱: 3dvlab@hdu.edu.cn
- GitHub Issues: 在仓库中创建Issue

---

**注意**: 请确保使用的照片有适当的使用权限，并且符合学术网站的专业标准。
