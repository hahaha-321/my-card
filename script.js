// ============================================
// 文件名称：script.js
// 功能说明：个人名片网页的交互逻辑
// 作者：Reasonix AI 助手
// 创建日期：2026年6月11日
// 这个文件控制按钮点击、弹窗、动画等交互行为
// ============================================

// ========== 保存名片功能 ==========
// 创建一个 .vcf 文件（电子名片格式），让用户可以下载保存
function saveContact() {
    // vCard 格式的文本内容
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:小明
TEL:请通过邮箱联系
EMAIL:xiaoming@example.com
NOTE:正在学习用 AI 开发程序
END:VCARD`;

    // 创建一个 Blob 对象（相当于一个文件数据块）
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    // 创建一个临时的下载链接
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "小明名片.vcf"; // 下载的文件名
    document.body.appendChild(link);
    link.click(); // 触发下载
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href); // 释放内存

    // 按钮动画反馈
    const btn = document.getElementById("btnSave");
    btn.textContent = "✅ 已保存";
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> 保存名片';
    }, 1500);
}

// ========== 分享名片功能 ==========
function shareCard() {
    // 名片信息文本
    const shareText = "小明\n正在学习用 AI 开发程序\n邮箱：xiaoming@example.com";

    // 检查浏览器是否支持 Web Share API（手机浏览器通常支持）
    if (navigator.share) {
        navigator.share({
            title: "小明的名片",
            text: shareText,
        }).catch(() => {}); // 用户取消分享时不做处理
    } else {
        // 电脑浏览器不支持 Web Share，改为复制到剪贴板
        navigator.clipboard.writeText(shareText).then(() => {
            const btn = document.getElementById("btnShare");
            btn.textContent = "✅ 已复制";
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-share-nodes"></i> 分享名片';
            }, 1500);
        }).catch(() => {
            alert("复制失败，请手动复制");
        });
    }
}

// ========== 弹窗功能 ==========
// 显示邮箱弹窗
function showEmailModal() {
    const overlay = document.getElementById("modalOverlay");
    overlay.classList.add("show");

    // 弹窗出现时禁止页面滚动
    document.body.style.overflow = "hidden";
}

// 关闭邮箱弹窗
function closeEmailModal() {
    const overlay = document.getElementById("modalOverlay");
    overlay.classList.remove("show");

    // 恢复页面滚动
    document.body.style.overflow = "";
}

// 复制邮箱并关闭弹窗
function copyEmailAndClose() {
    const email = "xiaoming@example.com";
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.querySelector(".modal-btn-copy");
        btn.textContent = "✅ 已复制";
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-copy"></i> 复制邮箱';
            closeEmailModal();
        }, 800);
    }).catch(() => {
        alert("复制失败，请手动复制");
    });
}

// ========== 键盘快捷键 ==========
// 按 ESC 键关闭弹窗
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeEmailModal();
    }
});