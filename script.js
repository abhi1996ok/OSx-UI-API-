var dataEmail;
var dataCium_Id;

var dataList;
var dataList1;
var dataList2;

function btnView(Email,Cium_Id)
{
  dataEmail = Email;
  dataCium_Id = Cium_Id;  
}
//viewButton event activation..

window.onload = function(){
	var viewBtn =document.getElementById("view");
	viewBtn.addEventListener("click",connect.bind(null,listCreater));
	};
	

//connect function for the first sections Api
function connect(crtFun)
    {
		
	  var xhttp;
	  xhttp=new XMLHttpRequest();
	  xhttp.onreadystatechange = function() 
	  {
		if (this.readyState == 4 && this.status == 200) 
		{
		  crtFun(this);
		}
	  };
	  xhttp.open("GET", "https://trackmysnapapi.azurewebsites.net/Receiver/Getadaptation?cium_id=DL-120319-TEST-006_nknjbubna120320191538258779&email_id=%22nknjbubna@gmail.com%22", true);
	  xhttp.send();
	
    }
	
//connect function for the second section's Api	
function connect2(crtFun1, ciamData)
    {
	  var xhttp;
	  xhttp=new XMLHttpRequest();
	  xhttp.onreadystatechange = function() 
	  {
		if (this.readyState == 4 && this.status == 200) 
		{
		  crtFun1(this);
		}
	  };
	  xhttp.open("GET", "https://trackmysnapapi.azurewebsites.net/Receiver/Getsku?ciam_id="+ciamData+"&email_id=%22nknjbubna@gmail.com%22", true);
	  xhttp.send();
	
    }

//connect function for the third section's Api	
function connect3(crtFun1, ciasmData)
    {
	  var xhttp;
	  xhttp=new XMLHttpRequest();
	  xhttp.onreadystatechange = function() 
	  {
		if (this.readyState == 4 && this.status == 200) 
		{
		  crtFun1(this);
		}
	  };
	  xhttp.open("GET", "https://trackmysnapapi.azurewebsites.net/Receiver/GetImages?ciasm_id="+ciasmData+"&email_id=%22nknjbubna@gmail.com%22", true);
	  xhttp.send();
	
    }

//connect function for the Full Size Image URL
function connect4(crtFun1, cimData, thumb)
    {
	  var xhttp;
	  xhttp=new XMLHttpRequest();
	  xhttp.onreadystatechange = function() 
	  {
		if (this.readyState == 4 && this.status == 200) 
		{
		  crtFun1(this,thumb);
		}
	  };
	  xhttp.open("GET", "https://trackmysnapapi.azurewebsites.net/Receiver/GetFullSizeImageUrl?cim_id="+cimData+"&email_id=%22nknjbubna@gmail.com%22", true);
	  xhttp.send();
	
    }
	
//list Creator Function for the first section	
function listCreater(conn)
	{   
	    var ulFirst = document.getElementById("prime");
		var ulSecond = document.getElementById("second"); 
		var ulThird = document.getElementById("third");
		dataList = JSON.parse(conn.responseText);
		ulSecond.innerHTML="";
		ulThird.innerHTML="";
		ulFirst.innerHTML="";
		var len = dataList.data.length;
		for(var i = 0; i < len; i++)
		{
			var add_li = document.createElement("li");
			add_li.setAttribute("class", "folderIco");
			add_li.setAttribute("style", "text-align:left; padding : 1em 0 1em 0.5em; background-size: 2em 2em; width: 100%;  border: 1px solid #ededed; border-top: 0; border-right: 0; border-left: 0; font-size: 1em; cursor: pointer;");
			add_li.appendChild(document.createTextNode(dataList.data[i].FolderName));
			add_li.setAttribute("data-CiamID",dataList.data[i].CIAM_Id);
			var dataCiamId = add_li.getAttribute("data-CiamID");
			add_li.addEventListener("click",connect2.bind(null,listCreater2,dataCiamId));
			ulFirst.appendChild(add_li);
		}  
		
	}
	
//list Creator Function for the Second section		
function listCreater2(conn1)
	{
		var ulSecond = document.getElementById("second"); 
		var ulThird = document.getElementById("third");
		ulThird.innerHTML="";
		ulSecond.innerHTML="";
		dataList1 = JSON.parse(conn1.responseText);
		var len = dataList1.data.length;
		for(var i=0; i < len; i++)
		{
			var add_li = document.createElement("li");
			add_li.setAttribute("class", "folderIco");
			add_li.setAttribute("style", "text-align:left; padding : 1em 0 1em 0.5em; background-size: 2em 2em; width: 100%;  border: 1px solid #ededed; border-top: 0; border-right: 0; border-left: 0; font-size: 1em; cursor: pointer;");
			add_li.appendChild(document.createTextNode(dataList1.data[i].skuName));
			add_li.setAttribute("data-CiasmID",dataList1.data[i].cism_id);
			var dataCiasmId = add_li.getAttribute("data-CiasmID");
			add_li.addEventListener("click",connect3.bind(null,listCreater3,dataCiasmId));
			ulSecond.appendChild(add_li);
		}  
		
	}
	
//list Creator Function for the third section		
function listCreater3(conn2)
	{ 
		var ulThird = document.getElementById("third");
		ulThird.innerHTML="";
		dataList2 = JSON.parse(conn2.responseText);
		var len = dataList2.data.length;
		for(var i=0; i < len; i++)
		{
			var add_li = document.createElement("li");
			add_li.setAttribute("class", "fileIco");
			add_li.setAttribute("style", "text-align:left; padding : 1em 0 1em 0.5em; background-size: 2em 2em; width: 100%;  border: 1px solid #ededed; border-top: 0; border-right: 0; font-size: 1em; cursor: pointer;");
			add_li.appendChild(document.createTextNode(dataList2.data[i].fileName));
			add_li.setAttribute("data-CimID",dataList2.data[i].cim_id);
			add_li.setAttribute("data-thumbUrl",dataList2.data[i].thumbUrl);
			var dataCimId = add_li.getAttribute("data-CimID");
			var dataThumbUrl = add_li.getAttribute("data-thumbUrl");
			add_li.addEventListener("click",connect4.bind(null,imgSet, dataCimId,dataThumbUrl));
			ulThird.appendChild(add_li);
		}  
		
	}
	
function imgSet(connImg,thumbUrl)
{
	var fullImgUrl = JSON.parse(connImg.responseText);
	var fancyImg = document.getElementById("origin");
	var thumbImg = document.getElementById("imge");
	thumbImg.src = thumbUrl;
	fancyImg.href = fullImgUrl.data;
}
