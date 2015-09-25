using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
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
        public double Gpa { get; set; }
        public DateTime BirthDate { get; set; }
        public string Sex { get; set; }
        public string TelNo { get; set; }
        public string Email { get; set; }
        public string CmuEmail { get; set; }
        public int ProgressStatus { get; set; }
        public string Aptitude { get; set; }
        #endregion

        #region "Constructor"
        public Students()
        {
        }

        public Students(SqlDataReader rs)
        {
            this.StuId = (string)rs["s_code"];
            this.TitleNameTH = (string)rs["title_th"];
            this.FirstNameTH = (string)rs["s_first_name_th"];
            this.LastNameTH = (string)rs["s_last_name_th"];
            this.NickNameTH = (string)rs["s_nickname_th"];
            this.Gpa = (double)rs["gpa"];
            this.TelNo = (string)rs["s_tel_no"];
            this.Email = (string)rs["s_contact_email"];
            this.CmuEmail = (string)rs["s_itsc_email"];
            this.Aptitude = (string)rs["s_aptitude"];
        }
        #endregion

        #region "Methods"

        public static List<Students> GetAllStudentsNameTH()
        {
            SqlConnection m_Connection = new SqlConnection(ConfigurationManager.ConnectionStrings["CoopConnectingPortal"].ToString());
            SqlCommand m_Command = new SqlCommand("Student_g_AllStudentsNameTH", m_Connection);

            m_Command.CommandType = CommandType.StoredProcedure;
            m_Connection.Open();

            SqlDataReader rs = m_Command.ExecuteReader(CommandBehavior.CloseConnection);

            List<Students> m_list = new List<Students>();

            while (rs.Read())
            {
                m_list.Add(new Students((SqlDataReader)rs));
            }

            rs.Close();
            m_Connection.Close();
            return m_list;
        }
        #endregion

    }
}