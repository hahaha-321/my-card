/*
============================================
文件名称：script.js
功能说明：个人名片网页的交互脚本
作者：Reasonix AI 助手
创建日期：2026年6月11日
============================================
这个文件负责名片的交互功能：
1. 页面加载时名片淡入动画
2. 头像点击时弹跳动画
3. "保存名片"按钮功能
4. "分享名片"按钮功能
*/

// ========== 页面加载完成后执行 ==========

// window.onload 是一个事件：当整个页面加载完成后触发
window.onload = function () {

    // ----- 第 1 步：名片淡入动画 -----
    var cardElement = document.getElementById("card"); // 通过 id 找到名片卡片
    if (cardElement) {
        cardElement.classList.add("fade-in"); // 添加淡入动画 CSS 类
    }

    // ----- 第 2 步：给头像添加点击弹跳动画 -----
    var avatarElement = document.getElementById("avatar"); // 通过 id 找到头像
    if (avatarElement) {
        avatarElement.addEventListener("click", function () {
            avatarElement.style.transform = "scale(0.9)"; // 缩小到 90%
            setTimeout(function () {
                avatarElement.style.transform = "scale(1.0)"; // 200 毫秒后恢复
            }, 200);
        });
    }
};

// ========== "保存名片"按钮功能 ==========

function saveContact() {
    // 准备联系信息
    var contactInfo = "姓名：小明\n";
    contactInfo = contactInfo + "介绍：正在学习用 AI 开发程序\n";
    contactInfo = contactInfo + "邮箱：xiaoming@example.com";

    // 创建下载文件
    var blob = new Blob([contactInfo], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob); // 生成临时链接

    // 自动触发下载
    var downloadLink = document.createElement("a"); // 创建隐藏下载标签
    downloadLink.href = url;
    downloadLink.download = "小明_联系方式.txt"; // 下载文件名
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click(); // 自动点击下载
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url); // 释放内存

    showToast("名片已保存为文件！"); // 提示用户
}

// ========== "分享名片"按钮功能 ==========

function shareCard() {
    var shareText = "【小明的个人名片】\n正在学习用 AI 开发程序\n邮箱：xiaoming@example.com";

    if (navigator.share) {
        // 手机浏览器：使用原生分享
        navigator.share({
            title: "小明的个人名片",
            text: shareText,
        }).catch(function (error) {});
    } else {
        // 电脑浏览器：复制到剪贴板
        copyToClipboard(shareText);
        showToast("名片内容已复制到剪贴板，可以粘贴发给朋友！");
    }
}

// ========== 复制文字到剪贴板的函数 ==========

function copyToClipboard(text) {
    var textarea = document.createElement("textarea"); // 创建临时文本框
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px"; // 隐藏到屏幕外
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select(); // 选中文字
    document.execCommand("copy"); // 执行复制命令
    document.body.removeChild(textarea); // 清理
}

// ========== 顶部提示信息函数（Toast 通知） ==========

function showToast(message) {
    var toast = document.createElement("div"); // 创建提示条
    toast.textContent = message;

    // 设置样式
    toast.style.position = "fixed";
    toast.style.top = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)"; // 水平居中
    toast.style.backgroundColor = "#323232"; // 深灰背景
    toast.style.color = "#ffffff"; // 白色文字
    toast.style.padding = "12px 28px";
    toast.style.borderRadius = "25px"; // 胶囊形状
    toast.style.fontSize = "14px";
    toast.style.fontFamily = '"Microsoft YaHei", "PingFang SC", sans-serif';
    toast.style.zIndex = "9999"; // 最顶层
    toast.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
    toast.style.opacity = "0"; // 初始透明
    toast.style.transition = "opacity 0.4s ease, top 0.4s ease"; // 过渡动画

    document.body.appendChild(toast);

    // 触发淡入动画
    setTimeout(function () {
        toast.style.opacity = "1";
        toast.style.top = "40px";
    }, 0);

    // 3 秒后自动隐藏
    setTimeout(function () {
        toast.style.opacity = "0";
        toast.style.top = "20px";
        setTimeout(function () {
            document.body.removeChild(toast); // 移除元素
        }, 400); // 等动画结束
    }, 3000);
}