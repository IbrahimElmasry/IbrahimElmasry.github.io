using System;

namespace PortfolioApp.Services;

public sealed class LanguageService
{
    public string CurrentLanguage { get; private set; } = "en";

    public bool IsArabic => CurrentLanguage == "ar";

    public event Action? OnLanguageChanged;

    public void SetLanguage(string lang)
    {
        if (CurrentLanguage == lang) return;
        CurrentLanguage = lang == "ar" ? "ar" : "en";
        OnLanguageChanged?.Invoke();
    }

    public void ToggleLanguage()
    {
        SetLanguage(IsArabic ? "en" : "ar");
    }

    public string T(string english, string arabic) => IsArabic ? arabic : english;
}
