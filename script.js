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
5. "联系我"邮箱弹窗功能
*/

// ========== 页面加载完成后执行 ==========

window.onload = function () {

    // ----- 第 1 步：名片淡入动画 -----
    var cardElement = document.getElementById("card");
    if (cardElement) {
        cardElement.classList.add("fade-in");
    }

    // ----- 第 2 步：给头像添加点击弹跳动画 -----
    var avatarElement = document.getElementById("avatar");
    if (avatarElement) {
        avatarElement.addEventListener("click", function () {
            avatarElement.style.transform = "scale(0.9)";
            setTimeout(function () {
                avatarElement.style.transform = "scale(1.0)";
            }, 200);
        });
    }
};

// ========== "保存名片"按钮功能 ==========

function saveContact() {
    var contactInfo = "姓名：小明\n";
    contactInfo = contactInfo + "介绍：正在学习用 AI 开发程序\n";
    contactInfo = contactInfo + "邮箱：xiaoming@example.com";

    var blob = new Blob([contactInfo], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);

    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "小明_联系方式.txt";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    showToast("名片已保存为文件！");
}

// ========== "分享名片"按钮功能 ==========

function shareCard() {
    var shareText = "【小明的个人名片】\n正在学习用 AI 开发程序\n邮箱：xiaoming@example.com";

    if (navigator.share) {
        navigator.share({
            title: "小明的个人名片",
            text: shareText,
        }).catch(function (error) {});
    } else {
        copyToClipboard(shareText);
        showToast("名片内容已复制到剪贴板，可以粘贴发给朋友！");
    }
}

// ========== 复制文字到剪贴板的函数 ==========

function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

// ========== 顶部提示信息函数（Toast 通知） ==========

function showToast(message) {
    var toast = document.createElement("div");
    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.top = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "#323232";
    toast.style.color = "#ffffff";
    toast.style.padding = "12px 28px";
    toast.style.borderRadius = "25px";
    toast.style.fontSize = "14px";
    toast.style.fontFamily = '"Microsoft YaHei", "PingFang SC", sans-serif';
    toast.style.zIndex = "9999";
    toast.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease, top 0.4s ease";

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.style.opacity = "1";
        toast.style.top = "40px";
    }, 0);

    setTimeout(function () {
        toast.style.opacity = "0";
        toast.style.top = "20px";
        setTimeout(function () {
            document.body.removeChild(toast);
        }, 400);
    }, 3000);
}

// ========== 「联系我」弹窗功能 ==========

function showEmailModal() {
    // 打开邮箱弹窗
    var overlay = document.getElementById("modalOverlay");
    if (overlay) {
        overlay.classList.add("show");
    }
}

function closeEmailModal() {
    // 关闭弹窗（点击遮罩背景或关闭按钮时执行）
    var overlay = document.getElementById("modalOverlay");
    if (overlay) {
        overlay.classList.remove("show");
    }
}

function copyEmailAndClose() {
    // 复制邮箱到剪贴板，然后关闭弹窗
    var emailText = "xiaoming@example.com";
    copyToClipboard(emailText);
    showToast("邮箱已复制到剪贴板！");
    closeEmailModal();
}