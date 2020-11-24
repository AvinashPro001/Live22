using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.Game
{
    public class M8SetLimitRequest
    {
        public string Com { get; set; }
        public string Comtype { get; set; }
        public string Lim1 { get; set; }
        public string Lim2 { get; set; }
        public string Lim3 { get; set; }
        public string Lim4 { get; set; }
        public string Max1 { get; set; }
        public string Max2 { get; set; }
        public string Max3 { get; set; }
        public string Max4 { get; set; }
        public string Max5 { get; set; }
        public string Max6 { get; set; }
        public string Max7 { get; set; }
        public string Suspend { get; set; }
    }

    public class M8SetLimitRequestWithRequired
    {
        [Required]
        public string Com { get; set; }
        [Required]
        public string Comtype { get; set; }
        [Required]
        public string Lim1 { get; set; }
        [Required]
        public string Lim2 { get; set; }
        [Required]
        public string Lim3 { get; set; }
        [Required]
        public string Lim4 { get; set; }
        [Required]
        public string Max1 { get; set; }
        [Required]
        public string Max2 { get; set; }
        [Required]
        public string Max3 { get; set; }
        [Required]
        public string Max4 { get; set; }
        [Required]
        public string Max5 { get; set; }
        [Required]
        public string Max6 { get; set; }
        [Required]
        public string Max7 { get; set; }
        [Required]
        public string Suspend { get; set; }

    }
}
