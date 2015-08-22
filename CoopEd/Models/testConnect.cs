using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CoopEd.Models
{
    public class testConnect
    {
        public int id { get; set; }
        public string name { get; set; }

        public testConnect()
        {
            GetAllItem();
        }

        public testConnect(SqlDataReader rs)
        {
            this.id = (int)rs["id"];
            this.name = (string)rs["name"];
        }

        public static List<testConnect> GetAllItem()
        {
            SqlConnection m_Connection = new SqlConnection(ConfigurationManager.ConnectionStrings["CoopConnectingPortal"].ToString());
            SqlCommand m_Command = new SqlCommand("testConn_g_AllItem", m_Connection);

            m_Command.CommandType = CommandType.StoredProcedure;
            m_Connection.Open();

            SqlDataReader rs = m_Command.ExecuteReader(CommandBehavior.CloseConnection);

            List<testConnect> m_list = new List<testConnect>();

            while (rs.Read())
            {
                m_list.Add(new testConnect((SqlDataReader)rs));
            }

            rs.Close();
            m_Connection.Close();
            return m_list;
        }

        public static void AddTestItem(String ItemName)
        {
            SqlConnection m_Connection = new SqlConnection(ConfigurationManager.ConnectionStrings["CoopConnectingPortal"].ToString());
            SqlCommand m_Command = new SqlCommand("testConn_i_item", m_Connection);
            m_Command.CommandType = CommandType.StoredProcedure;

            m_Command.Parameters.Add("@itemName", SqlDbType.VarChar).Value = ItemName;
            m_Connection.Open();
            m_Command.ExecuteNonQuery();
            m_Connection.Close();
        }


    }
}