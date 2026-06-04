/**
 * 使用浏览器原生打印功能导出 PDF。
 * 浏览器会根据 @media print CSS 和 break-inside/break-after
 * 规则自动处理分页，不会出现文字被拦腰截断的问题。
 */
export function exportResumeToPDF(): void {
    // 浏览器的 window.print() 会触发打印对话框，
    // 用户选择「另存为 PDF」即可获得正确分页的 PDF 文件。
    window.print();
}
