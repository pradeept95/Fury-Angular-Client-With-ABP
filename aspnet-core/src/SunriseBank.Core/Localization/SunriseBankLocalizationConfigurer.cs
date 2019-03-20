using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace SunriseBank.Localization
{
    public static class SunriseBankLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(SunriseBankConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(SunriseBankLocalizationConfigurer).GetAssembly(),
                        "SunriseBank.Localization.SourceFiles"
                    )
                )
            );
        }
         
    }
}
