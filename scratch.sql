# Load XML file to MySQL
SELECT VERSION();
SHOW VARIABLES LIKE 'local_infile';
SET GLOBAL local_infile = 1;
LOAD XML LOCAL INFILE '/xml/pubmed19n0001.xml'
    INTO TABLE medline.articles
    ROWS IDENTIFIED BY '<PubmedArticle>';

# Track progress of ftp downloads in SQLite3 db:pubmed.ftp.sqlite
select 'gz-match',  count() from pubmed_ftp pf where sts ='OK' and size = size_dl and name like '%gz'
union ALL 
select 'gz-mis-match',  count() from pubmed_ftp pf where sts ='OK' and size <> size_dl and name like '%gz'
union ALL 
select 'gz-pending',  count() from pubmed_ftp pf where size_dl is NULL and name like '%gz'
union ALL 
select 'md5-match',  count() from pubmed_ftp pf where sts ='OK' and size = size_dl and name like '%md5%'
union ALL 
select 'md5-mis-match',  count() from pubmed_ftp pf where sts ='OK' and size <> size_dl and name like '%md5%'
union ALL 
select 'md5-pending',  count() from pubmed_ftp pf where size_dl is NULL and name like '%md5%'
;
