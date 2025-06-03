@echo off
echo ========================================
echo HDU-3DV Lab Website Deployment Script
echo ========================================
echo.

REM 检查Git是否安装
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Git is not installed or not in PATH
    echo Please install Git first: https://git-scm.com/
    pause
    exit /b 1
)

echo Git is installed. Proceeding with deployment...
echo.

REM 检查是否在正确的目录
if not exist "index.html" (
    echo Error: index.html not found in current directory
    echo Please run this script from the 3DV-Lab-Website folder
    pause
    exit /b 1
)

echo Files found. Initializing Git repository...
echo.

REM 初始化Git仓库（如果还没有）
if not exist ".git" (
    git init
    echo Git repository initialized.
) else (
    echo Git repository already exists.
)

REM 添加所有文件
echo Adding files to Git...
git add .

REM 检查是否有更改
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo No changes to commit.
) else (
    echo Committing changes...
    git commit -m "Update HDU-3DV Lab website - %date% %time%"
)

REM 检查是否已设置远程仓库
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Setting up remote repository...
    echo Please enter the repository URL when prompted.
    echo Example: https://github.com/3D-V/3DV-Lab-Website.git
    echo.
    set /p repo_url="Enter repository URL: "
    git remote add origin !repo_url!
    echo Remote repository added.
)

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Website deployed successfully!
    echo ========================================
    echo.
    echo Your website will be available at:
    echo https://3d-v.github.io/3DV-Lab-Website/
    echo.
    echo Note: It may take 5-10 minutes for changes to appear.
    echo.
    echo Next steps:
    echo 1. Go to your GitHub repository
    echo 2. Click on Settings tab
    echo 3. Scroll down to Pages section
    echo 4. Set Source to "Deploy from a branch"
    echo 5. Select "main" branch and "/ (root)" folder
    echo 6. Click Save
    echo.
) else (
    echo.
    echo ========================================
    echo DEPLOYMENT FAILED!
    echo ========================================
    echo.
    echo Possible issues:
    echo 1. Authentication failed - check your GitHub credentials
    echo 2. Repository doesn't exist - create it first on GitHub
    echo 3. No permission to push - check repository permissions
    echo.
    echo Please check the error messages above and try again.
    echo.
)

echo Press any key to exit...
pause >nul
