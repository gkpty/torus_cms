import { API, graphqlOperation } from "aws-amplify";
import gql from '../GraphQL/QueryListArticles';
import { addToStorage } from './Shared.js';

export default function createIndex(){
	let query = API.graphql(graphqlOperation(gql))
	.then (result => {
		const articles = result.data.listArticles.items;
		const title = 'index';
		const section = 'articles';
		const heading = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <meta name="description" content=""> <meta name="author" content=""> <title> Almost CMS - ${section} - ${title} </title> <!-- Font Awesome Icons --> <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"> <!-- Google Fonts --> <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet"> <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css"> <!-- Plugin CSS --> <link href="../vendor/magnific-popup/magnific-popup.css" rel="stylesheet"> <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"> <!-- Theme CSS - Includes Bootstrap --> <link href="../css/index.css" rel="stylesheet"> </head> <body id="page-top">`;
		const nav = `<nav class="navbar navbar-expand-lg fixed-top py-3" id="mainNav"> <div class="container"> <a class="navbar-brand js-scroll-trigger" href="../index.html">Almost CMS</a> <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarResponsive"> <ul class="navbar-nav ml-auto my-2 my-lg-0"> <li class="nav-item"> <a class="nav-link js-scroll-trigger" href="../about.html">About</a> </li> <li class="nav-item"> <a class="nav-link js-scroll-trigger" href="index.html">Articles</a> </li> <li class="nav-item"> <a class="nav-link js-scroll-trigger" href="../gallery/index.html">Gallery</a> </li> <li class="nav-item"> <a class="nav-link js-scroll-trigger" href="../contact.html">Contact</a> </li> </ul> </div> </div> </nav> <div class="body">`;
		const header = `<section class="page-heading bg-primary" id="about"> <div class="container"> <div class="row justify-content-center"> <div class="col-lg-8 text-center"> <h4 class="text-white mt-0">The latest on Almost CMS</h4> </div> </div> </div> </section>`;
		const search_bar = `<section class="bg-light"> <div class="row py-2 pr-lg-2"> <div class="col-sm-12 container text-center"> <input id="articlesSearch" type="text" class="float-md-right search-bar" placeholder="Search.."> </div> </div> </section> <section class="body"> <table> <tbody id="articlesTable">`
		const footer = `</tbody> </table> </section> </div> <footer class="bg-light py-5"> <div class="container-fluid"> <div class="row small text-center text-muted"> <div class="col-md-6"> <div>Copyright &copy; 2019 - Almost CMS</div> </div> <div class="col-md-6"> <div> Powered By <a href="http://torus.digital">Almost CMS</a></div> </div> </div> </div> </footer>`;
		const scripts = `<script src="../vendor/jquery/jquery.min.js"></script> <script type="text/javascript"> $(document).ready(function(){$("#articlesSearch").on("keyup", function() {var value = $(this).val().toLowerCase(); $("#articlesTable tr").filter(function() {$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1) }); }); }); </script> <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script> <script src="../js/gallery.js"></script> </body> </html>`
		const contentType = 'text/html';
		var body = '';
		for (let elem of articles) { 
			body += (
				`<tr class="container">
					<td class="img-td">
						<img class="img-fluid p-4" src="../images/article_images/default_img.jpg">
					</td>
					<td class="h2 row article-title">
						<a href="${elem.title}.html">${elem.title}</a>
					</td>
					<td class="row article-body">
						${elem.body_txt.substring(0,128)} ...
					</td>         
				</tr>`
				); 
			}
		const fileObj = heading + nav + header + search_bar + body + footer + scripts;
		const Obj = {
			contentType: contentType,
			section: section,
			title: title,
			fileObj: fileObj,
		}
		let secondFunct = addToStorage(Obj.contentType, Obj.section, Obj.title, Obj.fileObj, 'html'); 
		return secondFunct;				
	})
	.catch(err => {
			console.log('error: ', err)
	});
	return query;
}