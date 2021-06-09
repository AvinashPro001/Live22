using System;

namespace Webet333.service.Model
{
    public class MaxBetRegister
    {
        public Guid UserId { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Username { get; set; }

        public int Currency { get; set; }

        public double maxtransfer { get; set; }

        public double mintransfer { get; set; }

        public string Custominfo1 { get; set; }

        public string Custominfo2 { get; set; }

        public string Custominfo3 { get; set; }

        public string Custominfo4 { get; set; }

        public string Custominfo5 { get; set; }
    }
}