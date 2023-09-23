using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;

namespace Data.Converter
{
    public class JsonConverter<T> : ValueConverter<List<T>, string> where T : class
    {
        public JsonConverter()
            : base(
            v => JsonSerializer.Serialize(v, null as JsonSerializerOptions),
            v => JsonSerializer.Deserialize<List<T>>(v, null as JsonSerializerOptions)
                )
        {
        }
    }
}
