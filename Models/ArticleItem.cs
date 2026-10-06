namespace PortfolioApp.Models;

public sealed class ArticleItem
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Category { get; set; } = "";
    public string ReadTime { get; set; } = "";
    public string Date { get; set; } = "";
    public string Snippet { get; set; } = "";
    public string HtmlContent { get; set; } = "";
}
