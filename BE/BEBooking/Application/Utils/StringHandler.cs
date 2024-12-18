using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utils
{
    public class StringHanlder
    {
        public static string? CapitalizeFirstLetterOfEachWord(string? text)
        {
            if (string.IsNullOrEmpty(text))
                return text;
            var words = text.Split(' ');
            var capitalizedString = string.Join(" ", words.Select(word =>
                char.ToUpper(word[0]) + word.Substring(1).ToLower()
            ));
            return capitalizedString;
        }
    }
}
