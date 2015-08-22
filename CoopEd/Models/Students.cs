using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoopEd.Models
{
    public class Students
    {
        #region "Properties"
        public int Id { get; set;}
        public string StuId { get; set; }
        public string TitleNameTH { get; set; }
        public string TitleNameEN { get; set; }
        public string FirstNameTH { get; set; }
        public string LastNameTH { get; set; }
        public string FirstNameEN { get; set; }
        public string LastNameEN { get; set; }
        public string FullNameTH { get { return this.TitleNameTH + " " + this.FirstNameTH + " " + this.LastNameTH; } }
        public string FullNameEN { get { return this.TitleNameEN + " " + this.FirstNameEN + " " + this.LastNameEN; } }
        public string NickNameTH { get; set; }
        public string NickNameEN { get; set; }
        public string AcademicYear { get; set; }
        public float Gpa { get; set; }
        public DateTime BirthDate { get; set; }
        public string Sex { get; set; }
        public string TelNo { get; set; }
        public string Email { get; set; }
        public int ProgressStatus { get; set; }
        public string Aptitude { get; set; }
        #endregion

        #region "Constructor"
        public Students()
        {
        }
        #endregion

        #region "Methods"
        #endregion

    }
}