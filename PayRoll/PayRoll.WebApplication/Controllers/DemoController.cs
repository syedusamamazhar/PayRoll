using PayRoll.BusinessLogic;
using PayRoll.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PayRoll.WebApplication.Controllers
{
    public class DemoController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Table(int iDisplayLength, int iDisplayStart, int iSortCol_0, string sSortDir_0, string sSearch)
        {
            int filteredCount = 0;

            List<DemoModel> _ListDemoModel = new List<DemoModel>();

            DataTable dt = DemoBL.Filter_Get(iDisplayLength, iDisplayStart, iSortCol_0, sSortDir_0, sSearch);

            foreach (DataRow row in dt.Rows)
            {

                filteredCount = int.Parse(row["TotalCount"].ToString());

                _ListDemoModel.Add(new DemoModel
                {
                    Code = int.Parse(row["Code"].ToString()),
                    Name = row["Name"].ToString(),
                });
            }
            var result = new
            {
                iTotalRecords = DemoBL.Get(),
                iTotalDisplayRecords = filteredCount,
                aaData = _ListDemoModel
            };

            //JavaScriptSerializer js = new JavaScriptSerializer();
            //Context.Response.Write(js.Serialize(result));

            return Json(new
            {
                result
            },
        JsonRequestBehavior.AllowGet);
        }

        public bool Delete(int Code)
        {
            if (DemoBL.Delete(Code) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public JsonResult Get(int Code)
        {
            DemoModel _DemoModel = new DemoModel();

            DataTable dt = DemoBL.Get(Code);

            foreach (DataRow row in dt.Rows)
            {
                _DemoModel.Code = Code;
                _DemoModel.Name = row["Name"].ToString();
            }
            return Json(new
            {
                data = _DemoModel
            },
       JsonRequestBehavior.AllowGet);
        }

        public bool Insert(string Name)
        {
            DemoModel _DemoModel = new DemoModel();
            _DemoModel.Name = Name;

            _DemoModel.CreatedBy = Session["User"].ToString();

            string returnvar= DemoBL.Insert(_DemoModel);

            return true;
        }

        public bool Update(int Code, string Name)
        {
            DemoModel _DemoModel = new DemoModel();
            _DemoModel.Code = Code;
            _DemoModel.Name = Name;

            _DemoModel.UpdatedBy = Session["User"].ToString();

            return DemoBL.Update(_DemoModel);
        }
    }
}