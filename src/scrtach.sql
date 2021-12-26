SELECT VERSION();
SHOW VARIABLES LIKE 'local_infile';
SET GLOBAL local_infile = 1;
LOAD XML LOCAL INFILE '/xml/pubmed19n0001.xml'
    INTO TABLE medline.articles
    ROWS IDENTIFIED BY '<PubmedArticle>';
