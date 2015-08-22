using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoopEd.Models
{
    public class Documents
    {
        #region "Properties"
        public int Id { get; set; }
        public string DocName { get; set; }
        public string DocType { get; set; }
        public string StoreLocation { get; set; }
        public string VerifyStatus { get; set; }
        public string OwnerId { get; set; }
        #endregion

        #region "Constructors"
        #endregion
         
        #region "Methods"
        #endregion
    }
}