using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CoopEd.Models;
using System.Web.Script.Serialization;
using System.Text;

namespace CoopEd.Controllers
{
    public class StudentsController : ApiController
    {
        Students[] students = new Students[]
        {
           //new Students { Id = 1, StuId = "550510584", TitleNameTH = "นาย", TitleNameEN = "Mr.", FirstNameEN = "Nattawut", FirstNameTH = "ณัฐวุติ", LastNameEN = "Kongchatri", LastNameTH = "คงชาตรี", NickNameEN = "zG", NickNameTH = "สก", AcademicYear = "2555", Aptitude = "None", BirthDate = DateTime.Today, Email = "nkongchatri@gmail.com", Gpa = 1.00f, ProgressStatus = 2, Sex = "Male", TelNo = "0802922247"   },
           //new Students { Id = 2, StuId = "550510631", TitleNameTH = "นาย", TitleNameEN = "Mr.", FirstNameEN = "Supitsara", FirstNameTH = "ศุภิสรา", LastNameEN = "Prathan", LastNameTH = "ประทาน", NickNameEN = "Bm", NickNameTH = "บม", AcademicYear = "2555", Aptitude = "None", BirthDate = DateTime.Today, Email = "sprathan@gmail.com", Gpa = 4.00f, ProgressStatus = 2, Sex = "Male", TelNo = "08602974235"   }
        };

        [Route("api/students/GetAllStudentsNameTH")]
        public HttpResponseMessage GetAllStudentsNameTH()
        {
            List<Students> items = Students.GetAllStudentsNameTH();
            JavaScriptSerializer js = new JavaScriptSerializer();
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            response.Content = new StringContent(js.Serialize(items), Encoding.UTF8, "text/plain");

            return response;
        }


        //[Route("api/students/GetAllStudent2")]
        //public HttpResponseMessage GetIncomeOperatingBudget(string BuildingID, string Year, string Type, string Period)
        //{
        //    List<Students> stds = students.OfType<Students>().ToList();
        //    JavaScriptSerializer js = new JavaScriptSerializer();
        //    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

        //    response.Content = new StringContent(js.Serialize(stds), Encoding.UTF8, "text/plain");

        //    return response;
        //}

    }

   
}
