/*
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1258438679306279"
     crossorigin="anonymous"></script>
<!-- ADHTML 300x600 -->
<ins class="adsbygoogle"
     style="display:inline-block;width:300px;height:600px"
     data-ad-client="ca-pub-1258438679306279"
     data-ad-slot="9421414645"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
*/

let script1 = document.createElement("script");
script1.setAttribute(
  "src",
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1258438679306279"
);
script1.setAttribute("crossorigin", "anonymous");
script1.async = true;

let ins = document.createElement("ins");
ins.setAttribute("class", "adsbygoogle");
ins.setAttribute("style", "display:inline-block;width:300px;height:600px");
ins.setAttribute("data-ad-client", "ca-pub-1258438679306279");
ins.setAttribute("data-ad-slot", "9421414645");

let script2 = document.createElement("script");
script2.textContent = "(adsbygoogle = window.adsbygoogle || []).push({});";

document.getElementById("aside").appendChild(script1);
document.getElementById("aside").appendChild(ins);
document.getElementById("aside").appendChild(script2);
