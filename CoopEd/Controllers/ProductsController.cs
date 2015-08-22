using CoopEd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoopEd.Controllers
{
    public class ProductsController : ApiController
    {
        Products[] products = new Products[] 
        { 
            new Products { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 }, 
            new Products { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M }, 
            new Products { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M } 
        };

        public List<testConnect> GetAllProducts()
        {
            //testConnect.AddTestItem("a");
            List<testConnect> items = testConnect.GetAllItem();
            return items;
        }

        public IHttpActionResult GetProduct(int id)
        {
            var product = products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}