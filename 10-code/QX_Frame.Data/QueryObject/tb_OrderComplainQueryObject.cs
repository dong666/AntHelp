using QX_Frame.App.Base;
using QX_Frame.Data.Entities;
using System;
using System.Linq.Expressions;

namespace QX_Frame.Data.QueryObject
{
	/// <summary>
	/// copyright qixiao code builder ->
	/// version:4.2.0
	/// author:qixiao(柒小)
	/// time:2017-04-12 01:28:15
	/// </summary>

	/// <summary>
	///class tb_OrderComplainQueryObject
	/// </summary>
	public class tb_OrderComplainQueryObject:WcfQueryObject<db_AntHelp,tb_OrderComplain>
	{
		/// <summary>
		/// construction method
		/// </summary>
		public tb_OrderComplainQueryObject()
		{}

		// PK（identity）  
		public Guid complainUid { get;set; }

		// 
		public String complainContent { get;set; }

		// 
		public Guid complainUserUid { get;set; }

		// 
		public DateTime complainTime { get;set; }

		// 
		public Int32 complainStatusId { get;set; }

		//query condition // null default
		public override Expression<Func<tb_OrderComplain, bool>> QueryCondition {get { return base.QueryCondition; } set { base.QueryCondition = value; } }

		//query condition func // true default //if QueryCondition != null this will be override !!!
		protected override Expression<Func<tb_OrderComplain, bool>> QueryConditionFunc()
		{
			Expression<Func<tb_OrderComplain, bool>> func = t => true;

			if (!string.IsNullOrEmpty(""))
			{
				func = func.And(t => true);
			}

			return func;
		}
	}
}
