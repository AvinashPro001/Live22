﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game
{
    public class GlobalVariableUpdateRequest : BaseAdminLogRequest
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
