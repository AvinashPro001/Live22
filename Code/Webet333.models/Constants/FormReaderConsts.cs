using System;

namespace Webet333.models.Constants
{
    public class FormReaderConsts : IDisposable
    {
        public const uint DefaultValueCountLimit = 1024;
        public const uint DefaultKeyLengthLimit = 1024 * 2;
        public const uint DefaultValueLengthLimit = 1024 * 1024 * 4;

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    public class FormOptions
    {
        public uint ValueCountLimit { get; set; } = FormReaderConsts.DefaultValueCountLimit;
        public uint KeyLengthLimit { get; set; } = FormReaderConsts.DefaultKeyLengthLimit;
        public uint ValueLengthLimit { get; set; } = FormReaderConsts.DefaultValueLengthLimit;
    }
}
