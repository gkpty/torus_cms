# almost_cms
Almost CMS isn't really a CMS but its got a serverless admin style app that allows a user to upload pictures and write posts to an s3 bucket. As the admin adds content, a series of other lambda functions get triggered to create new pages for each article and update the index page for the articles page and the gallery page. There's also another function that gets triggered to re-write the xml sitemap everytime content is changed.
