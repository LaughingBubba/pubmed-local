1. <PubmedArticle>
<PubmedArticle> is one of the top document level elements in the PubmedArticleSet (PubmedBookArticle and DeleteCitation being the other two) and contains one entire record. <PubMedArticle> is an envelop element that contains the <MedlineCitation> and <PubmedData> elements.


2. <MedlineCitation>
<MedlineCitation> is a sub-document envelope containing the following elements: <PMID> <DateCreated> <DateCompleted> <DateRevised> <Article> <MedlineJournalInfo> <ChemicalList> <SupplMeshList> <CitationSubset> <CommentsCorrectionsList> <GeneSymbolList> <MeshHeadingList> <NumberofReferences> <PersonalNameSubjectList> <OtherID> <OtherAbstract> <KeywordList> <CoiStatement> <SpaceFlightMission> <InvestigatorList> <GeneralNote>.

This element has five attributes: Owner, Status, IndexingMethod, VersionID, and VersionDate as described below. VersionID and VersionDate were added with the 2011 DTD but were not used until February 2012. Only one journal, PLoS Currents, is currently using the versioning model.

<MedlineCitation Owner="Value"> The party responsible for creating and validating the citation is recorded as the MedlineCitation Owner attribute. Each citation has only one MedlineCitation Owner and there are eight possible values for this attribute: NLM | NASA | PIP | KIE | HSR | HMD | SIS | NOTNLM. The valid Owner values for the various NLM departments and outside collaborating data partners are:

	NLM - National Library of Medicine, Index Section (the vast majority of citations carry this value)
	NASA - National Aeronautics and Space Administration (not a current value; only on older citations)
	PIP - Population Information Program, Johns Hopkins School of Public Health (not a current value; only on older citations)
	KIE - Kennedy Institute of Ethics, Georgetown University (not a current value; only on older citations)
	HSR - National Information Center on Health Services Research and Health Care Technology, National Library of Medicine
	HMD - History of Medicine Division, National Library of Medicine
	SIS - Specialized Information Services Division, National Library of Medicine (not yet used; reserved for possible future use)
	NOTNLM - NLM does not plan to use this value for <MedlineCitation> or <GeneralNote> on citations it exports; users may want to use this value if they want to adapt the MEDLINE DTD for other applications.

	Some of the above Owner attributes - NASA, PIP, and KIE - may also be used with <GeneralNote> and <KeywordList> elements if the citation has been enriched with additional data by a collaborating partner. As of January 2013, NLM uses NOTNLM with <KeywordList>.

<MedlineCitation Status="Value">
The Status attribute indicates the stage of a citation. There are seven possible values for the MedlineCitation Status attribute: Completed | In-Process | PubMed-not-MEDLINE | In-Data-Review | Publisher | MEDLINE | OLDMEDLINE, as described below in the order in which processing of records occurs.

	MedlineCitation Status attribute: In-Data-Review
	Records submitted to NLM electronically by publishers are added to PubMed at NLM and given in In-Data-Review status. Records in this status have undergone review at the journal issue level; i.e., the journal title, date of publication and volume/issue elements (referred to as the source data) are checked. Before records are distributed in In-Data-Review status, the source data have either:
		been matched to the print copy in the NLM collection and are correct; or
		been matched to the online version of the journal (when NLM assigns MeSH® headings from the online version) and are correct; or
		been compared to previously checked in issues and appear to match the pattern or have been changed to match the established pattern. In these cases, the physical item has not yet been received for the NLM collection and the data have not been positively verified and may still change during the NLM processing cycle.
	While all three reviews are at the issue level, most citations fit into the last condition above. It is possible that the source information may be changed at a later point in the NLM quality assurance cycle once the hard copy issue is available for exact comparison.

	In-Data-Review records lack the <DateCompleted> element. They are not yet MEDLINE records because they have not undergone complete quality review and MeSH indexing; thus they should not be identified as MEDLINE records.

	The issue level review for In-Data-Review status is the first step in quality control and the records will either be typically reissued as In-process status records or go to PubMed-not-MEDLINE final record status.

	See additional information for retrospective records.

	MedlineCitation Status attribute: In-Process
	Records in this status have undergone a citation level review; i.e., the author names, article title, and pagination are checked. All In-Data-Review records that entered the workflow via publisher electronic submission are redistributed again in In-Process status whether or not they were revised as a result of the second citation level review, and are not identified in any way as having been revised or not having been revised. Users will simply see that this is the second time records with the same PMID, now in In-process status, are received. The In-process version of the record replaces the In-Data-Review version. This workflow means that users will receive many records twice: once after the review of the issue level information of electronically submitted records (i.e., the In-Data-Review status records) and again after the review of the individual citation data (In-process status records).

	Note: Beginning at the end of January 2009, In-process status citations may be edited to add funding agency data provided in author manuscripts submitted to PubMed Central® (PMC). Thus, an In-process status citation may be re-exported with this additional data, and, less likely, may be subsequently re-exported if the data are found to be incorrect or need to be deleted.

	Records created via NLM current other data entry mechanism, scanning/optical character recognition (OCR), are distributed for the first time in In-Process status after their creation.

	In-process records lack the <DateCompleted> element; however, they do contain the <CitationSubset> element. They are not yet MEDLINE records because they have not undergone complete quality review and MeSH indexing; thus they should not be identified as MEDLINE records.

	Most in-process records are eventually indexed with MeSH Headings and are elevated to completed MEDLINE status. However, some are determined to be out of scope (e.g., articles on plate tectonics or astrophysics from certain MEDLINE journals, primarily general science and chemistry journals, for which the life sciences articles are indexed for MEDLINE) and are not elevated to MEDLINE status; instead they become PubMed-not-Medline final status records. In rare cases the records are deleted and do not become PubMed-not-MEDLINE records.

	Some records originally in PubMed-not-MEDLINE status are re-exported in In-Process status; see <GeneralNote>.

	See additional information for retrospective records.

	MedlineCitation Status attribute: MEDLINE
	In-process records undergo rigorous quality assurance routines before they are elevated to MEDLINE status or to PubMed-not-MEDLINE status.

	Records in MEDLINE status are the only 'true' MEDLINE records in the xml distribution. They contain <DateCompleted> and <CitationSubset> and, in most cases, contain <MeshHeadingList>. MEDLINE records that are Retractions of Publications (see Publication Type element) are exceptions and do not contain <MeshHeadingList>. MEDLINE records may be new or existing records that have been revised (see maintenance).

	MEDLINE status records are distributed as part of the annual baseline files along with OLDMEDLINE and PubMed-not-MEDLINE records.

	MedlineCitation Status attribute: OLDMEDLINE
	A small percentage of the records in the OLDMEDLINE subset (designated by <CitationSubset> value OM) are in MedlineCitation Status = OLDMEDLINE. The criterion for records to be in OLDMEDLINE status is that all the original MeSH Headings which reside in the <KeywordList> have not yet been mapped to current MeSH. It is possible, however, that one or more old Keyword terms have been mapped. For the larger number of OLDMEDLINE subset records whose <MedlineCitation> Status is MEDLINE, all old Keyword terms have been mapped to current MeSH. NLM exports both new and revised OLDMEDLINE records on an irregular and infrequent basis.

	Beginning with the 2005 baseline distribution, OLDMEDLINE status records are distributed as part of the annual baseline files along with MEDLINE and PubMed-not-MEDLINE records.

	MedlineCitation Status attribute: PubMed-not-MEDLINE
	Records in this status are from journals included in MEDLINE and have undergone quality review but are not assigned MeSH headings because the cited item is not in scope for MEDLINE either by topic or by date of publication, or from non-MEDLINE journals and have undergone quality review. The specific categories of non-MEDLINE records in this status are:

		citations to articles that precede the date a journal was selected for MEDLINE indexing and are submitted for inclusion in PubMed after July 2003;
		out of scope citations to articles in journals covered by MEDLINE;
		analytical summaries of articles published elsewhere (see the article, "Linking MEDLINE Citations to Evidence-Based Medicine Assessments and Summaries", in the May-Jun 2002 NLM Technical Bulletin, page e2); and
		starting in summer 2005, prospective citations to articles from non-MEDLINE journals that submit full text to PMC and are thus cited in PubMed.

	NLM first began distributing records in PubMed-not-MEDLINE status at the end of July 2003 when it ceased using the old MedlineCitation Status value of Out-of-scope. Records previously distributed in the old Out-of-scope status were converted to the more generic PubMed-not-MEDLINE status and redistributed with the 2004 baseline database.

	Records in PubMed-not-MEDLINE status have most often first been distributed in In-Data-Review status prior to their quality review.

	PubMed-not-MEDLINE records contain <DateCompleted> element.

	PubMed-not-MEDLINE records do not contain <CitationSubset> and <MeshHeadingList> elements.

	PubMed-not-MEDLINE status records are distributed as part of the annual reload files along with MEDLINE and OLDMEDLINE records.

	See additional information for retrospective records.

	MedlineCitation Status attribute: Publisher
	The records in Publisher MedlineCitation Status are:

		the retrospective records for the relatively few non-MEDLINE journals in PubMed (Note: starting July 2005 prospective non-MEDLINE journal records in PubMed are distributed in PubMed-not-MEDLINE status);
		the retrospective records for MEDLINE journals prior to date of selection for MEDLINE and that were submitted electronically by the publishers before late July 2003;
		the prospective records for currently indexed journals when the publisher has submitted an issue's citation data electronically and NLM still awaits its print copy or access to the electronic copy to use for issue level review (i.e., the journal title, date of publication and volume/issue elements) AND the publisher-supplied record contains a validation error of some kind that prevents it from being exported from the NLM Data Creation and Maintenance System (DCMS) along with the records not containing errors from the same issue. If there were no errors, the record would move to MedlineCitation Status In-Data-Review right away and be exported. In these cases, however, NLM staff must take corrective action before the record can be elevated to In-Data-Review status for export;
		citations electronically submitted for articles that appear on the Web in advance of the journal issue's release (i.e., ahead of print citations). Following publication of the completed issue, the item will be queued for issue level review and released in In-Data-Review status;
		citations to author manuscripts per NIH's Public Access policy. Many of the scientists who receive research funding from NIH publish the results of this research in journals that are not available in PMC. In order to improve access to these research articles, these authors are required to give PMC the final, peer reviewed manuscripts of such articles once they have been accepted for publication. Citations to these author manuscripts in PMC reside in PubMed in Publisher status; and
		citations to books and book chapters in the NCBI Bookshelf.

	MedlineCitation Status attribute: Completed
	This attribute is no longer used. Beginning with the 2005 baseline distribution, records previously distributed in Completed status are distributed in either MEDLINE or OLDMEDLINE status.

Retrospective Records
Note that retrospective records for currently indexed MEDLINE journals sent electronically by publishers after late July 2003 and covering publication dates prior to the journal's selection for MEDLINE are exported in In-Data-Review status and then again in In-process and finally PubMed-not-MEDLINE status; however, if NLM does not have a paper copy of the back issue in its collection, the records are exported in In-Data-Review MedlineCitation Status only, and they are not further processed for subsequent redistribution in In-process or PubMed-not-MEDLINE status. Back issue data for currently indexed MEDLINE titles for which NLM does have hardcopy back issues in its collection are subsequently exported in PubMed-not-MEDLINE MedlineCitation Status.

IndexingMethod <MedlineCitation IndexingMethod =”Value”>

The IndexingMethod attribute was added in 2017, and values were added in 2018. This attribute is to identify MEDLINE citations for which the method used to apply MeSH terms was not traditional human indexing. This is an implied attribute and is only present if a value is specified. If the IndexingMethod attribute is not present, the indexing method is fully human indexed. The valid values for IndexingMethod are:

	Curated - MeSH terms were provided algorithmically and a human reviewed, and possibly modified, the algorithm results
	Automated - MeSH terms were provided algorithmically



Versioning <MedlineCitation VersionID =”Value”> and <MedlineCitation VersionDate =”Value”>

The VersionID and VersionDate attributes used with <MedlineCitation> are used when “versioned” citations are added to PubMed. “Versioning” is a model of publishing whereby publishers release multiple versions of the same article, sometimes in quick succession and sometimes almost as soon as the original article has been published. To associate versioned articles with each other, NLM creates an individual citation for each article’s version and links the versions via the VersionID and VersionDate attributes of <MedlineCitation> and the Version attribute in the <PMID> element. The VersionID and VersionDate values supplied by the publisher will identify the specific version. The VersionDate value may be the same as the citation’s <PubDate> if the new version was released later the same day that the article was first published. NLM does not expect many journals will publish versions, thus the incidence of versioned citations is expected to be small. NLM began adding versioned citations to the database in February 2012. If a citation is not for Version 1, the MedlineCitation element must contain VersionID and VersionDate.

Here is an example:

	<MedlineCitation Owner = "NLM" Status = "In-Data-Review" VersionDate = "2009/09/29" VersionID = "2"> 

Back to top.

 

2. <PMID>
<PMID>, the PubMed (NLM database that incorporates MEDLINE) unique identifier, is a 1 to 8-digit accession number with no leading zeros. This element has one attribute, Version, added with the 2011 DTD, to accommodate the model of publishing known as "versioning" discussed in <MedlineCitation>. <PMID> is present on all records exported for download and, combined with its version attribute value, is the accession number for managing and disseminating records. Since February 2012, MEDLINE includes citations with values other than one for the Version attribute of the PMID elements. Only one journal, PLoS Currents, is using the versioning model of publishing. A PMID Version attribute value higher than 1 will indicate that there is a citation for at least one prior version (although it might happen, rarely, that a prior version subsequently gets deleted).

	Examples are:

	<PMID Version="1">10097079</PMID>
	<PMID Version="1">6012557</PMID>
	<PMID Version="1">10</PMID>
	<PMID Version="2">20029614</PMID>

<PMID> may also be present in <CommentsCorrections>.

Additional information/background:
Prior to the 2004 version of MEDLINE, all records contained a <MedlineID> in addition to the <PMID>. Beginning with the 2004 baseline database first distributed in December 2003, NLM no longer exports the <MedlineID>. The <PMID> has become the single element to uniquely identify the MEDLINE record.

Back to top.

 

3. <DateCreated>
The 2018 DTD removed the <DateCreated> element.

Additional information/background:
<DateCreated> is the date processing of the record begins.

	An example is:

	<DateCreated>
	<Year>2002</Year>
	<Month>05</Month>
	<Day>16</Day>
	</DateCreated>

For citations up to about the year 2000, the Date of Entry element in the NLM legacy ELHILL® system was used to set both <DateCreated> and <DateCompleted>.

For records in the OLDMEDLINE subset (<CitationSubset> = OM): <DateCreated> for citations converted from the 1964 and 1965 Index Medicus (IM), represents the year and month the citations were printed in the monthly Index Medicus, and the day will always be "01". All other records have a year based on the year of the printed index, the month is always "12" for December, and the day is always "01".

Back to top.

 

4. <DateCompleted>
<DateCompleted> is the date processing of the record ends; i.e., MeSH Headings have been added, quality assurance validations are completed, and the completed record subsequently is distributed to PubMed. This is contrasted with <DateCreated> that is the date processing begins. In-Data-Review, In-Process and Publisher records lack <DateCompleted>. Also see <GeneralNote>.

	An example is:

	<DateCompleted>
	<Year>2002</Year>
	<Month>02</Month>
	<Day>07</Day>
	</DateCompleted>

Additional information/background:
Once a year, generally in mid-November, all MeSH headings on citations are synchronized with the new edition of MeSH. The MeSH Indexing year runs until the next global update of citations. See What are the date ranges for past MeSH Indexing years? for more information. For records in the OLDMEDLINE subset (<CitationSubset> = OM): <DateCompleted> is the approximate date the record entered PubMed instead of the date processing ends because OLDMEDLINE records are created and processed differently than MEDLINE records.

Back to top.

 

5. <DateRevised>
<DateRevised> resides on all records at time of export. It identifies the date a change is made to a record, there is no indication of what the change is on the record. When <DateRevised> and <DateCreated> are the same date the record is new to PubMed and is being exported for the first time.

It is possible for large numbers of records to be maintained and will contain an updated <DateRevised> element.

	An example is:

	<DateRevised>
	<Year>2002</Year>
	<Month>03</Month>
	<Day>20</Day>
	</DateRevised>

Additional information/background:
When the 10 million+ MEDLINE records through the 2000 production year were converted to XML from the NLM legacy ELHILL system, all records were assigned a <DateRevised> of 20001218 (December 18, 2000). Subsequently, many of these records have been or will be maintained, thus have or in the future will have a later <DateRevised> value.

Back to top.

 

6. <Article>
<Article> is an 'envelop' element that contains various elements describing the article cited; e.g., article title and author name(s). It has a single attribute, PubModel, which is used to identify the medium/media in which the cited article is published. There are five possible values for PubModel: Print | Print-Electronic | Electronic | Electronic-Print | Electronic-eCollection.

	<Article PubModel="Print"> - the journal is published in print format only
	<Article PubModel="Print-Electronic"> - the journal is published in both print and electronic format
	<Article PubModel="Electronic"> - the journal is published in electronic format only
	<Article PubModel="Electronic-Print"> - the journal is published first in electronic format followed by print (this value is currently used for just one journal, Nucleic Acids Research)
	<Article PubModel="Electronic-eCollection"> - used for electronic-only journals that publish individual articles first and then later collect them into an “issue” date that is typically called an eCollection.

NLM derives these values from the data submitted by the publishers. Various combinations of the <Article> PubModel attribute setting and the data in <ArticleDate> permit control of which dates display in the source area of the PubMed citation display. For information on how to interpret these data to indicate print and/or electronic publication dates when creating the source, access //www.nlm.nih.gov/bsd/licensee/elements_article_source.html.

Back to top.

 

7. <Journal>
This is an 'envelop' element that contains various elements describing the journal cited; i.e., ISSN, Volume, Issue, and PubDate and author name(s), however, it does not contain data itself.

Back to top.

 

8. <ISSN>
<ISSN> (International Standard Serial Number) is always an eight-character value that uniquely identifies the cited journal. It is nine characters long in the hyphenated form: XXXX-XXXX. It has a single attribute, ISSNType, which indicates which of the ISSNs assigned to the journal is recorded in the citation. Some journals are published online in addition to or instead of in print and a unique ISSN is assigned for each version. For journals published in both media (referred to as hybrid journals), NLM chooses one version to use for MeSH indexing and the ISSN and ISSNType for that version appears in the MEDLINE citation. The three valid values are Electronic, Print, and Undetermined, although Undetermined is not used for MEDLINE/PubMed data.

	Examples are:

	< ISSN IssnType ="Print"> 0950-382X </ ISSN >
	< ISSN IssnType ="Electronic"> 1432-2218 </ ISSN>

Some records do not contain an <ISSN> value. See also <NlmUniqueID> , <JournalIssue> and <ISSNLinking>.

Information about journals cited in MEDLINE, including the complete title of the journal, is found in:

	NLM online catalog available at LocatorPlus (https://catalog.nlm.nih.gov/) and NLM Catalog (//www.ncbi.nlm.nih.gov/nlmcatalog/).
	SERFILE, another file that may be downloaded from NLM (see https://www.nlm.nih.gov/databases/download/data_distrib_main.html)
	PubMed journals files located at http://www.nlm.nih.gov/bsd/serfile_addedinfo.html (contains limited journal information; updated daily)
	The List of Serials Indexed for Online Users available at http://www.nlm.nih.gov/tsd/serials/lsiou.html and the list of journals indexed in MEDLINE available at http://www.nlm.nih.gov/lstrc/j_sel_faq.html#a15.

Back to top

 

9. <JournalIssue>
This element contains information about the specific issue in which the article cited resides. It has a single attribute, CitedMedium, which indicates whether a citation is processed/indexed at NLM from the online or the print version of the journal. The two valid attribute values are Internet and Print.

	Examples are:

	< JournalIssue CitedMedium ="Internet">
	< JournalIssue CitedMedium ="Print">

Back to top

 

10. <Volume>
The volume number of the journal in which the article was published is recorded here.

	Examples are:

	<Volume>7</Volume>
	<Volume>5 Spec No</Volume>
	<Volume>49 Suppl 20</Volume>
	<Volume>Doc No 93</Volume>

The last example is for a journal published electronically. This format occurs rarely, as NLM prefers to put electronic document numbers in the <Pagination>element.

Additional information/background:
For records in the OLDMEDLINE subset (<CitationSubset> = OM): Some records contain <Issue> but lack <Volume>; some records contain <Volume> but lack <Issue>; and some records contain Volume and Issue data in the Volume element.

Back to top.

 

11. <Issue>
<Issue> identifies the issue, part or supplement of the journal in which the article was published.

	Examples are:

	<Issue>Pt 1</Issue>
	<Issue>Pt B</Issue>
	<Issue>3 Spec No</Issue>
	<Issue>7 Pt 1</Issue>
	<Issue>First Half</Issue>
	<Issue>3 Suppl</Issue>
	<Issue>3 Suppl 1</Issue>

Additional information/background:
For records in the OLDMEDLINE subset (<CitationSubset> = OM): Some records contain <Issue> but lack <Volume>; some records contain <Volume> but lack <Issue>; and some records contain Volume and Issue data in the Volume element.

Back to top.

	 

12. <PubDate>
<PubDate> contains the full date on which the issue of the journal was published. The standardized format consists of elements for a 4-digit year, a 3-character abbreviated month, and a 1 or 2-digit day. Every record does not contain all of these elements; the data are taken as they are published in the journal issue, with minor alterations by NLM such as abbreviating months.

	Examples are:

	<PubDate>
	<Year>2001</Year>
	<Month>Apr</Month>
	<Day>15</Day>
	</PubDate>

	<PubDate>
	<Year>2001</Year>
	<Month>Apr</Month>
	</PubDate>

	<PubDate>
	<Year>2001</Year>
	</PubDate>

The date of publication for the great majority of records will reside in the separate date-related elements within <PubDate> as shown above and in these cases the record will not contain <MedlineDate>. The date of publication of the article will be found in <MedlineDate> when parsing for the separate fields is not possible; i.e., cases where dates do not fit the Year, Month, or Day pattern.

	Examples are:

	<PubDate>
	<MedlineDate>1998 Dec-1999 Jan</MedlineDate>
	</PubDate>

	<PubDate>
	<MedlineDate>2000 Spring</MedlineDate>
	</PubDate>

	<PubDate>
	<MedlineDate>2000 Spring-Summer</MedlineDate>
	</PubDate>

	<PubDate>
	<MedlineDate>2000 Nov-Dec</MedlineDate>
	</PubDate>

	<PubDate>
	<MedlineDate>2000 Dec 23- 30</MedlineDate>
	</PubDate>

The PubDate on citations to versions of the same article will be identical.

Back to top.

 

13. <Title>
The full journal title (taken from NLM cataloging data following NLM rules for how to compile a serial name) is exported in this element. Some characters that are not part of the NLM MEDLINE/PubMed Character Set reside in a relatively small number of full journal titles. The NLM journal title abbreviation is exported in the <MedlineTA> element.

	Examples are:

	<Title>Molecular microbiology</Title>
	<Title>American journal of physiology. Cell physiology</Title>

Back to top.

 

14. <ISOAbbreviation>
This element is used to export the NLM version of the journal title ISO Abbreviation. ISO Abbreviations are constructed at NLM to assist NCBI in linking from GenBank to PubMed. Those created prior to 2007 did not necessarily conform to the ISO standard. ISO Abbreviations created after this date are identical to the NLM title abbreviations. In November 2009 ISO abbreviations were retrospectively assigned for every record from a journal that was currently indexed for MEDLINE at that time.

	Examples are:

	<ISOAbbreviation>Mol. Microbiol.</ISOAbbreviation>
	<ISOAbbreviation>Am. J. Physiol., Cell Physiol.</ISOAbbreviation>
	<ISOAbbreviation>Environ Monit Assess</ISOAbbreviation>

Back to top.

 

15. <ArticleTitle>
<ArticleTitle> contains the entire title of the journal article. <ArticleTitle> is always in English; those titles originally published in a non-English language and translated for <ArticleTitle> are enclosed in square brackets. All titles end with a period unless another punctuation mark such as a question mark or bracket is present. Explanatory information about the title itself is enclosed in parentheses, e.g.: (author's transl). Corporate/collective authors may appear at the end of <ArticleTitle> for citations up to about the year 2000. See also <AuthorList> for more information about corporate/collective authors.

Records distributed with [In Process Citation] in <ArticleTitle> are non-English language citations in In-Process <MedlineCitation> status that do not yet have the article title translated into English.

	Examples are:

	<ArticleTitle>The Kleine-Levin syndrome as a neuropsychiatric disorder: a case report.</ArticleTitle>
	<ArticleTitle>Why is xenon not more widely used for anaesthesia?</ArticleTitle>
	<ArticleTitle>[Biological rhythms and human disease]</ArticleTitle>
	<ArticleTitle>[In Process Citation]</ArticleTitle>
	<ArticleTitle>[The effect of anti-arrhythmic drugs on myocardial function (author's transl)]</ArticleTitle>
	<ArticleTitle>Prevalence of Helicobacter pylori resistance to antibiotics in Northeast Italy: a multicentre study. GISU. Interdisciplinary Group for the Study of Ulcer.</ArticleTitle>

Additional information/background:
For records in the OLDMEDLINE subset (<CitationSubset> = OM): For citations from the 1964 and 1965 Cumulated Index Medicus (CIM), <ArticleTitle> is in all upper case letters. Some citations contain the value "Not Available" for <ArticleTitle>. OLDMEDLINE records do not contain Corporate/Collective authors in <ArticleTitle>.

Back to top.

 

16. <Pagination>
<Pagination> indicates the inclusive pages for the article cited. The pagination can be entirely non-digit data and redundant digits are omitted. Document numbers for electronic articles are found here. <ELocationID> was defined for use in 2008 and may reside on records either in lieu of Pagination or, for items with both print and electronic locations, in addition to the Pagination element.

The complete pagination is found in the <MedlinePgn> element. The <StartPage> and <EndPage> elements are not currently used and are reserved for future use.

	Examples are:

	<MedlinePgn>12-9</MedlinePgn>
	<MedlinePgn>304- 10</MedlinePgn>
	<MedlinePgn>335-6</MedlinePgn>
	<MedlinePgn>1199-201</MedlinePgn>
	<MedlinePgn>24-32, 64</MedlinePgn>
	<MedlinePgn>34, 72, 84 passim</MedlinePgn>
	<MedlinePgn>31-7 cntd</MedlinePgn>
	<MedlinePgn>176-8 concl</MedlinePgn>
	<MedlinePgn>iii-viii</MedlinePgn>
	<MedlinePgn>XC-CIII</MedlinePgn>
	<MedlinePgn>P32- 4</MedlinePgn>
	<MedlinePgn>32P-35P</MedlinePgn>
	<MedlinePgn>suppl 111-2</MedlinePgn>
	<MedlinePgn>564</MedlinePgn>
	<MedlinePgn>[6021 words; 81 paragraphs] </MedlinePgn>
	<MedlinePgn>E101-6</MedlinePgn>
	<MedlinePgn>44; discussion 44-8</MedlinePgn>
	<MedlinePgn>925; author reply 925- 6</MedlinePgn>
	<MedlinePgn>e66</MedlinePgn>
	<MedlinePgn>1 p preceding table of contents</MedlinePgn>
	<MedlinePgn>129e1- 4</MedlinePgn> (abstract only on page 129 of print journal with full text article on pages e1-e4 in the online version)
	<MedlinePgn>10.1-8</MedlinePgn> (e-article number followed by a period followed by traditional pagination)

Additional information/background:
From approximately December 2002 to December 2013, pagination for author replies was handled as follows: If the reply was written by one or more of the authors of the original article, the words "author reply" and the page number of the reply were included in the pagination field of the original article. This rule applied only to citations with <PublicationType> Letter. Beginning with 2013 publication dates, a separate citation is created for an author reply. The word "discussion" was never used for author replies. "Discussion" continues to be used within pagination for articles that are not author replies, such as an article presented at a meeting that is followed by the text of a separate discussion or verbal exchange by a panel or others attending the meeting.

Back to top.

 

17. <ELocationID>

The purpose of the ELocationID element, defined in 2008, is to provide an electronic location for items which lack standard page numbers. The element houses Digital Object Identifiers (DOIs) or Publisher Item Identifiers (PIIs) that are provided by publishers for new citations submitted to NLM for inclusion in MEDLINE/PubMed. ELocationID may reside either in lieu of pagination or, for items with both print and electronic locations, in addition to the Pagination element. Beginning in October 2012, DOI data submitted by publishers in the PubMed-only ArticleId element is added to the ElocationID element if no other data are present. Retrospectively, DOI data in the ArticleId element were copied to the ElocationID element for citations back to 2008.

The element has two attributes, EIdType and ValidYN. EIdType indicates the type of ELocation data, DOI or PII. It is anticipated that a DOI will be supplied far more frequently by publishers than a PII. The default ValidYN value is “Y”. If corrected ELocation data is supplied by publishers to NLM, the revised DOI will be tagged ValidYN=Y and the original DOI will be retained with the ValidYN value “N”.

	Examples are:

	<ELocationID EIdType="doi" ValidYN="Y">10.1021/cr068126n</ELocationID>
	<ELocationID EIdType=”doi” ValidYN="N">10.1001/jama.298.18.216</ELocationID>

	<ELocationID EIdType="pii" ValidYN="Y">18829</ELocationID>

Back to top.

 

18. <Abstract> and <AbstractText>
English-language abstracts are taken directly from the published article. If the article does not have a published abstract, the National Library of Medicine does not create one, thus the record lacks the <Abstract> and <AbstractText> elements. However, in the absence of a formally labeled abstract in the published article, text from a substantive "summary", "summary and conclusions" or "conclusions and summary" may be used.

Publishers have given the National Library of Medicine permission to use abstracts for which they claim copyright; NLM does not hold copyright on the abstracts in MEDLINE. Users should obtain an opinion from their legal counsel for any use they plan for the abstracts in the database.

Generally, there are no abstracts for records created before 1975. However, starting in April 2007 NLM began to add abstracts from articles in PMC to the equivalent MEDLINE/PubMed citation record if that record does not already contain an abstract. The abstracts are derived from the PMC scanning project which is digitizing the back issues of participating PMC journals. As a result, additional records published prior to 1975 will contain abstracts.

All abstracts are in English. Some records may contain <OtherAbstract> in addition to or instead of <Abstract>. Because data entry policies at NLM have changed over the years, abstracts in records may be truncated, in which case one of the following phrases may appear at the end of the text enclosed in parentheses:
ABSTRACT TRUNCATED AT 250 WORDS
ABSTRACT TRUNCATED AT 400 WORDS
ABSTRACT TRUNCATED (This message occurred infrequently once the maximum length was raised to 4,096 characters in 1996.)

The maximum length of abstracts for records created after 2000 is 10,000 characters.

	An example is:

	<AbstractText> Many disorders may result in delay of language. . . . . . . . . . . . . . The reason for suggesting this diagnostic category is to stress that these children do initially behave in a similar way to those who are peripherally deaf. (ABSTRACT TRUNCATED AT 250 WORDS) </AbstractText>

The <CommentsCorrections> element with its RefType attribute ErratumIn and the associated <RefSource> and <Note> elements are used when there is a published erratum of a dosage error in a published abstract. Accordingly, the <AbstractText> is edited to add the phrase [DOSAGE ERROR CORRECTED] after the corrected section.

	An example is:

	<AbstractText>...AVE0118 ( 1, 3 and 10mg/kg/h) [DOSAGE ERROR CORRECTED] terminated AF in 11, 30, and 60%, respectivley.</AbstractText>

Additional information/background:
History - Original policy on inclusion of abstracts set a limit of 250 words for acceptance. Effective with the January 1984 data (i.e., NLM ELHILL legacy system 8401 Entry Month) two changes were made in this policy: 1) the word limit was expanded to 400 words for abstracts from articles 10 pages or more in length or from articles in the core journals identified by the National Cancer Institute and 2) abstracts exceeding the 250- or 400-word limit are to be included in truncated form at the end of the sentence closest to the word limit. The percentage of records with abstracts has increased over the years as more publishers gave permission for NLM to include these data. A chart showing the number of MEDLINE records containing abstracts in various segments of MEDLINE is available at: http://www.nlm.nih.gov/bsd/medline_lang_distr.html.

For records in the OLDMEDLINE subset (<CitationSubset> = OM): As a general rule, OLDMEDLINE citations do not contain abstracts; however, it is possible that on a rare occasion an abstract may reside on an OLDMEDLINE citation.

STRUCTURED ABSTRACTS

Structured abstracts describe key aspects of the purposes, methods, and results of a journal article in a consistent way. About a quarter of all abstracts currently added to MEDLINE® include structured abstracts. NLM has not truncated structured abstracts even if they surpassed the previous 250 or 400 word limit.

Beginning with the 2011 DTD, two attributes, Label and NlmCategory, are used with <AbstractText> if there is a structured abstract. In general, the lack of Label and NlmCategory attributes in AbstractText means the published abstract is unstructured; that is, does not incorporate label names. A Label name found in published structured abstracts (e.g., Introduction, Goals, Study Design, Findings, Discussion) is identified in the XML as <AbstractText Label= > and each ‘parent’ concept to which the published Label name is mapped by NLM is identified as <AbstractText NlmCategory= >. Valid values for the NLM-assigned mapped-to categories for the NlmCategory attribute are: BACKGROUND, OBJECTIVE, METHODS, RESULTS, CONCLUSIONS. The other valid value is UNASSIGNED.

Only the first <AbstractText> segment of structured abstracts is allowed to lack a label in the full text; such segments are exported with <AbstractText Label="UNLABELLED">. They are not mapped to a 'parent' concept and, thus, will not have an NlmCategory attribute.

Since June 19, 2013, NLM considers abstracts structured if they have at least one label that is:

	listed on the NLM-approved label list;
	electronically submitted by publishers as part of supplied citations' abstracts; or
	identified by NLM PubMed data import procedures.



NLM added the NlmCategory attribute valid value UNASSIGNED at this time. The UNASSIGNED value is used for labels in structured abstracts for which mappings to one of the 5 specific NlmCategories (i.e., BACKGROUND, OBJECTIVE, METHODS, RESULTS, CONCLUSIONS) are not yet determined. Check the NLM Technical Bulletin and the label list for the most recent information.

In the following example, PMID 19897313, the published label names are INTRODUCTION; AIMS; DESIGN, SETTING AND PARTICIPANTS; RESULTS; and DISCUSSION which correspondingly map to the five NLM-assigned categories.

	An example is:

	<Abstract> <AbstractText Label = "INTRODUCTION" NlmCategory = "BACKGROUND">Physicians are often reluctant to prescribe strong opioids for chronic non cancer pain (CNCP). No study has qualitatively examined physicians' beliefs about …</AbstractText>
	<AbstractText Label = "AIMS" NlmCategory = "OBJECTIVE">To describe physicians' attitudes and experience of prescribing opioids for CNCP to PWHSA.</AbstractText>
	<AbstractText Label = "DESIGN, SETTING AND PARTICIPANTS" NlmCategory = "METHODS">Nineteen individual interviews and two focus groups were conducted with GPs, Addiction Specialists, Pain Specialists and Rheumatologists.</AbstractText>
	<AbstractText Label = "RESULTS" NlmCategory = "RESULTS">Physicians were "reluctant" to prescribe opioids to PWHSA experiencing CNCP for fear of addiction, misuse or diversion of medications. Many exhibited "distrust"…</AbstractText>
	<AbstractText Label = "DISCUSSION" NlmCategory = "CONCLUSIONS">Applying the chronic disease model to comorbid addiction and CNCP would ensure a health and social care system that makes it difficult to stigmatise patients…</AbstractText>
	</Abstract>

The content of structured abstracts is exported in separate segments that need to be joined for display of the complete abstract text. Additional information is available.

In Summer 2014, NLM added Dryad and figshare data repositories to the <DataBankList> elements. Data availability information may also reside in the <AbstractText> element labeled DATA AVAILABILTY, e.g. <AbstractText Label="DATA AVAILABILITY"> Data deposited in the Dryad repository: http://doi.org/10.5061/dryad.585t4</AbstractText>.

Back to top.

 

19. <CopyrightInformation> associated with <AbstractText> was introduced in 1999, and appears on a limited but increasing number of records. This singly-occurring element contains a copyright statement provided by the publisher of the journal and appears only on records supplied electronically to NLM by the publisher. NLM suggests that publishers of this data display this information at the end of the abstract.

	An example is:

	<Abstract>
	<AbstractText>Aphidicolin, a selective inhibitor of DNA polymerase, totally blocks DNA replication in the micronucleus but not in the macronucleus of Paramecium caudatum. The ciliates no longer divide and after 4 days the DNA content of the macronucleus has increased by 64%. Concomitantly the cell volume has increased by 53%.</AbstractText>
	<CopyrightInformation>Copyright 1999 Academic Press.</CopyrightInformation>
	</Abstract>

Publishers or authors may still claim copyright on abstracts in records lacking <CopyrightInformation>. Refer to the NLM Terms and Conditions for copyright-related information.

Back to top.

 

20. <AuthorList>
Personal and collective (corporate) author names published with the article are found in <AuthorList>. Anonymous articles (including those with pseudonyms) are identified by the absence of <AuthorList>. For records created from 1966 - 1983, every author of every journal article is included in <AuthorList>. For records created from 1984 - 1995, a maximum of 10 author names was entered in the database. Beginning with journal issues published in 1996 and through 1999, a maximum of 25 author names was entered, and beginning with journal issues published in 2000 all author names published in the journal again are entered. During the 1996 - 1999 time period, when there were more than 25 authors, the first 24 were taken plus the last author as the 25th occurrence. Beginning mid-2005, the various policy restrictions on number of author names entered in past years were lifted so that on an individual basis, a record may be edited to include all author names present in the published article regardless of the limitation in effect at the time the record was first created.

If an article has more authors than were entered into the record, then <AuthorList CompleteYN= "N"> indicates the list is not complete. This attribute, when set to "N" for No should be translated into 'et al.' for display purposes.

The attribute ValidYN is used on each Author occurrence to indicate the true spelling of the name (some published author names are subsequently corrected by the publishers and NLM retains both versions in the MEDLINE/PubMed record). ValidYN=Y (present for most author names) indicates the spelling of the name is correct; ValidYN=N (present for a small number of author names) indicates the spelling of the name is not correct, per publisher's erratum published in the journal.

Personal name <Author> data resides in the following elements:

	<LastName> contains the surname or the single name used by an individual, even if that single name is not considered to be a surname
	<ForeName> contains the remainder of name except for suffix
	<Suffix> contains a valid MEDLINE suffix (e.g., 2nd, or 3rd, etc., Jr or Sr). Honorifics (e.g., PhD, MD, etc.) are not carried in the data.
	<Initials> contains up to two initials
	<Identifier> was added to <AuthorList> with the 2010 DTD, but was not used until 2013. It is defined to contain a unique identifier associated with the name. The value in the Identifier attribute Source designates the organizational authority that established the unique identifier. Identifier was renamed from NameID with the 2013 DTD. For example, <Identifier Source="ORCID">0000000179841889</Identifier>.
	<AffiliationInfo> was added to <AuthorList> with the 2015 DTD. The <AffiliationInfo> envelope element includes <Affliliation> and <Identifier>.
	<EqualContrib> was added to <Author> with the 2017 DTD. 

Additional information about initials:

	Initials are found at the beginning of the name string or following a break. A break is a space or hyphen.
	Only capital letters in ForeName are candidates for initials except for the letter following a hyphen. The letter following a hyphen is a candidate for an initial unless the string following the hyphen is 'ichi'.
	If ForeName is only initials, there will be spaces between initials.
	Initial includes the following particles: de, do, da, du, del, dos, el-, le and el. All except 'el-' are followed by a space and are preceded by a space or are at the beginning of the name string.
	There is no space between initials, but there is a space between a particle and the initial it modifies. If found, all particles will be converted to lower case in <Initials>.
	If language is Bulgarian, Russian, Serbo-Croatian (Roman), or Ukrainian, then Initial may be a 2-4 character transliterated mixed-case initial.

Additional information about Affiliation:

Starting in 1988, NLM began to include the address of the first author's affiliation on the record. Originally the address was intended to help differentiate between two authors of the same name, not to provide detailed mailing information. It evolved that the institution, city, and state including zip code for U.S. addresses, and country for countries other than the United States, were included if provided in the journal; sometimes the street address was also included if provided in the journal. In 1995, NLM began to add the designation USA at the end of <Affiliation> where the first author's affiliation is in the 50 United States or the District of Columbia. Effective January 1, 1996, NLM includes the first author's electronic mail (e-mail) address at the end of <Affiliation>, if present in the journal. Starting in 2003 the complete first author address is entered as it appears in the article with no words omitted. Note that the first author is not necessarily the corresponding or senior author identified in the published article; simply the first name in the published author list is entered.

Starting in 2014, NLM includes the affiliation of each Author name, Investigator name, or Corporate Author name when submitted by publishers with the XML data for MEDLINE citations. Furthermore, as of October 1, 2013, NLM no longer performs quality control of the affiliation data or edits it to add “USA” or e-mail address as appropriate.

With the addition of the <AffiliationInfo> envelope in 2015, NLM can include multiple affiliations for individual authors as well as institutional (affiliation) identifiers in MEDLINE citations when provided by publishers with citation data.

	Examples are:

	<AffiliationInfo>

	<Affiliation>Department of Anesthesiology, University of Virginia Health Sciences Center Charlottesville 22908, USA. med2p@virginia.edu</Affiliation>
	</AffiliationInfo>

	<AffiliationInfo>
	<Affiliation>Departamento de Farmacologia, Facultad de Medicina, Universidad Complutense de Madrid (UCM), 28040 Madrid, Spain.</Affiliation>
	</AffiliationInfo>

	<AffiliationInfo>
	<Affiliation>Center for Children With Special Needs, Children's Hospital, and the Department of Pediatrics, University of Washington School of Medicine, 4800 Sand Point Way NE, CM:09, Seattle, WA 98105-0371, USA. jneff@chmc.org</Affiliation>
	</AffiliationInfo>

	<AffiliationInfo>
	<Affiliation>Harvard Medical School, Boston, Massachusetts</Affiliation>
	<Identifier Source=”Ringgold”>123456</Identifier>
	</AffiliationInfo>
	<AffiliationInfo>
	<Affiliation>Program on Regulation, Therapeutics, and Law, Division of Pharmacoepidemiology and Pharmacoeconomics, Department of Medicine, Brigham and Women's Hospital, Boston, Massachusetts</Affiliation>
	</AffiliationInfo>
	<AffiliationInfo>
	<Affiliation>Beth Israel Deaconess Medical</Affiliation>
	<Identifier Source=”Ringgold”>678922</Identifier>
	</AffiliationInfo>

Regarding investigator affiliations (see <InvestigatorList>):
The investigator affiliation identifies the organization that the researcher was affiliated with at the time the article was written and as published in the journal. Unlike <Affiliation> associated with Author names, this affiliation generally does not include detailed address information.

	Examples are:

	<AffiliationInfo>
	<Affiliation>Marquette U, Milwaukee, WI</Affiliation>
	</AffiliationInfo>

	<AffiliationInfo>
	<Affiliation>VA Med Ctr, Richmond, VA</Affiliation>
	</AffiliationInfo>

Additional information about full first and middle names:

Full first and middle names, if published, are entered in <ForeName> beginning with items published in 2002. Prior to 2002 NLM did not enter full first or middle names; instead only initials were entered and pre-2002 records were not maintained to include full names. Full personal names are included, however, on all citations owned by one of NLM collaborating data producers, the Kennedy Institute of Ethics (KIE), (MedlineCitationOwner="KIE") regardless of year of publication. KIE also supplied full author names for some NLM-owned citations that predate 2002; those data are found in the <GeneralNote> element.

	Examples are:

	<Author ValidYN="Y">
	<LastName>Melosh</LastName>
	<ForeName>H J</ForeName>
	<Suffix>3rd</Suffix>
	<Initials>HJ</Initials>
	</Author>

	<Author ValidYN="Y">
	<LastName>Abrams</LastName>
	<ForeName>Judith</ForeName>
	<Initials>J</Initials>
	</Author>

	<Author ValidYN="Y">
	<LastName>Buncke</LastName>
	<ForeName>Gregory M</ForeName>
	<Initials>GM</Initials>
	</Author>

	<Author ValidYN="Y">
	<LastName>Amara</LastName>
	<ForeName>Mohamed el-Walid</ForeName>
	<Initials>Mel- W</Initials>
	</Author>

	<Author ValidYN="Y">
	<LastName>Gonzales-loza</LastName>
	<ForeName>María del R</ForeName>
	<Initials>Mdel R</Initials>
	</Author>

	<Author ValidYN="Y">
	<LastName>Todoroki</LastName>
	<ForeName>Shin-ichi</ForeName>
	<Initials>S</Initials>
	</Author>

	<Author ValidYN="Y">
	<LastName>Krylov</LastName>
	<ForeName>Iakobish K</ForeName>
	<Initials>IaK</Initials>
	</Author>

Personal names of individuals (e.g., collaborators and investigators) who are listed in the paper as members of a collective/corporate group that is an author of the paper reside in <InvestigatorList>.

Additional information about collective or corporate names:

Collective or corporate name <Author> data resides in <CollectiveName>, which was introduced to MEDLINE with the 2001 DTD that was implemented in mid-November 2000. Prior to this, corporate author information was contained only at the end of <ArticleTitle>, where it remains for those retrospective records (see <ArticleTitle>). As they are encountered, these retrospective records may be individually maintained to move the collective/corporate name from <ArticleTitle> to <CollectiveName>. For records entering MEDLINE beginning in mid-November 2000, the collective/corporate name is found in <CollectiveName>. These names enter MEDLINE exactly as they appear in the journal; NLM will not edit the names to standardize them or translate them into English. NLM enters the Roman alphabet words (e.g., German, French) into <CollectiveName>. Transliterated Russian or other cyrillic names are also entered into <CollectiveName> but for Japanese, Chinese, Hebrew, and Arabic NLM puts the English translation of the name into the <CollectiveName>.

Initially, NLM placed the personal author names associated with an article before any collective names in AuthorList, regardless of the order in which the names appear in the published article. In May 2006, NLM began to enter the author names in the order cited in the published article. Thus, since that time, collective names are interspersed with personal names in AuthorList.

	A complete <AuthorList> example including <CollectiveName> is:

	<AuthorList CompleteYN="Y">
	<Author ValidYN="Y">
	<LastName>Gunnars</LastName>
	<ForeName>B</ForeName>
	<Initials>B</Initials>
	</Author>
	<Author ValidYN="Y">
	<LastName>Nygren</LastName>
	<ForeName>P</ForeName>
	<Initials>P</Initials>
	</Author>
	<Author ValidYN="Y">
	<CollectiveName>SBU-group. Swedish Council of Technology Assessment in Health Care</CollectiveName>
	</Author>
	</AuthorList>

Additional information about corrected names:

When an author's name has been corrected from a published erratum, the corrected name is placed in <AuthorList>, and the incorrect name originally published is retained in the last occurrence with the attribute Valid YN=N. In this circumstance, the <CommentsCorrections> RefType is ErratumIn and there is an associated <Note> clarifying the correct and incorrect names (see <CommentsCorrections>).

	An example is:

	<AuthorList>
	<Author ValidYN="Y">
	<LastName>Dunkel</LastName>
	<ForeName>E C</ForeName>
	<Initials>EC</Initials>
	</Author>
	.
	.
	.
	<Author ValidYN="Y">
	<LastName>Whitley</LastName> (this is the corrected name)
	<ForeName>R J</ForeName>
	<Initials>RJ</Initials>
	</Author>
	.
	.
	.
	<Author ValidYN="N">
	<LastName>Whitely</LastName> (this is the originally published name)
	<ForeName>R J</ForeName>
	<Initials>RJ</Initials>
	</Author>
	</AuthorList>
	.
	.
	.
	<CommentsCorrections>
	<ErratumIn>
	<RefSource>J Infect Dis 1998 Aug;178 (2):601</RefSource>
	<Note>Whitely RJ[corrected to Whitley RJ]</Note>
	</ErratumIn>
	</CommentsCorrections>

Additional information/background:
The NLM webpage: Authorship in MEDLINE explains the current policies that are followed in designating the various forms of authorship in MEDLINE.

NLM expended much effort to parse the data converted from the legacy ELHILL format at the end of the 2000 production year accurately. Many citations from the 1966-1974 timeframe were changed to follow data entry conventions established later; e.g., particles such as "van der" were moved from the suffix position to the last name, and the abbreviations 2d and 3d were changed to 2nd and 3rd. It is possible to have only a <LastName>. Some occurrences of author data in this category are in error and will be corrected manually as time permits and subsequently redistributed as revised records.

For records in the OLDMEDLINE subset (<CitationSubset> = OM): Every published author name is included in <AuthorList> for citations from the 1951 - 1959 Current List of Medical Literature (CLML) and for citations from the 1960 - 1965 CIM. For citations from the 1950 CLML, a maximum of three author names were entered and the incomplete list is indicated by <AuthorList CompleteYN= "N">. OLDMEDLINE <LastName> and <ForeName> elements are in all upper case letters, except in some cases the particle is in lower case letters. <Suffix> is in upper and lower case letters. OLDMEDLINE records do not contain collective or corporate names. A small percentage of OLDMEDLINE records contain <LastName> only because that is the only Author data present in the printed index used to create the record.

The forward slash is a legal character for the LastName element; it is used as the second character in Ethiopian surnames.

Back to top.

 

21. <Language>
The language in which an article was published is recorded in <Language>. All entries are three letter abbreviations stored in lower case, such as eng, fre, ger, jpn, etc. When a single record contains more than one language value the XML export program extracts the languages in alphabetic order by the 3-letter language value. Some records provided by collaborating data producers may contain the value und to identify articles whose language is undetermined.

	Examples are:
	<Language>eng</Language>
	<Language>rus</Language>

A table listing all languages found in MEDLINE is at http://www.nlm.nih.gov/bsd/language_table.html. A chart showing the number of English language MEDLINE articles in various segments of MEDLINE is available at: http://www.nlm.nih.gov/bsd/medline_lang_distr.html.

Additional information/background:
For records in the OLDMEDLINE subset (<CitationSubset> = OM): Approximately 16% of OLDMEDLINE citations have the language abbreviation "und" for undetermined.

Back to top.

 

22. <DataBankList>
This element contains information pertaining to the registration of several types of data: 1) molecular sequence data (beginning in 1988 and expanded in 2014); 2) clinical trial numbers (beginning summer 2005 and expanded in 2006 and 2014); 3) gene expression/molecular abundance data (beginning February 2006); 4) PubChem identifiers (beginning in January 2007 and expanded in 2014); 5)Two general research databanks, the Dryad Digital Repository and figshare (beginning in 2014); and 6) BioProject identifiers (beginning in 2014). The complete list of databanks is available at //www.nlm.nih.gov/bsd/medline_databank_source.html.

	NLM cooperates with international efforts to collect molecular sequence data. There are numerous databanks that register molecular sequences deposited with them by researchers. In 1988, NLM began with 7 databanks and added 8 more in 2014. In the journal literature, a reference to the databank and the accession number assigned to the sequence may accompany, or substitute for, a lengthy graphic representation of the sequence itself. The <DataBank> and <AccessionNumber> elements in <DataBankList> are populated if this information appears in the journal article. If the article lists a databank but no accession number, "UNKNOWN" is entered for the databank accession number. There is no attempt to edit or verify the databank accession numbers that appear in the journal. Since sequences may be deposited with more than one databank, there may be multiple occurrences of the <DataBank> element in <DataBankList> associated with a single article. This information may appear on the article title page, in a footnote or in a statement such as: Sequence data from this article have been deposited with the EMBL, GenBank and DDBJ Data Libraries under Accession No. M16978. Note: Molecular sequence data from EMBL and DDBJ are assigned <DataBankName> = GENBANK.

	NLM first began to include molecular sequence data with the 1988 indexing year. Prior to 2000, the NLM policy was to enter up to 30 databank accession numbers for each record. Some global maintenance was done over the years to add databank names/accession numbers whether or not the article itself contained those references. From 2000 forward, NLM enters all databank accession numbers published in the journal. <DataBank> data in <DataBankList> are sorted first by <DataBankName> and then by <AccessionNumber>.

	If an article has more molecular sequence databank numbers than entered into MEDLINE then <DataBank CompleteYN="N"> indicates the list is not complete in which case NLM suggests supplying the literal "etc." after the last occurrence for display purposes.
	Beginning in summer 2005, NLM includes the ClinicalTrials.gov identifier number in <DataBankList> elements when the article is devoted solely and entirely to announcing or reporting the results of the clinical trial. The ICMJE Web site (http://www.icmje.org/) contains an editorial and updates on the topic of registering clinical trials before publication of the results.

	Beginning mid-2006, MEDLINE citations also carry the International Standard Randomised Controlled Trial Number (ISRCTN) when the article is devoted solely and entirely to announcing or reporting the results of the clinical trial or other study that the Identifier Number represents. The ISRCTN Register is a clinical trials deposit site based in the UK that meets the criteria set forth by the ICMJE (International Committee of Medical Journal Editors) for responsible disclosure of information to the public. The letters ISRCTN are a part of the trial number. Retrospective maintenance was taken on existing citations in MedlineCitation status = MEDLINE to add ISRCTN numbers if an existing citation's article title or abstract contained that data.

	Beginning in 2014, MEDLINE citations also carry identifier numbers for many of the primary registries in the World Health Organization (WHO) Registry Network (http://www.who.int/ictrp/network/primary/en/index.html) when the article is devoted solely and entirely to announcing or reporting the results of the clinical trial or other study that the identifier number represents.
	Beginning in February 2006, accession numbers for data deposited in the NLM Gene Expression Omnibus (GEO) database are included in the <DataBankList> elements. GEO is a gene expression/molecular abundance repository supporting data submissions, and a curated, online resource for gene expression data browsing, query and retrieval.

	The <DataBankName> is GEO and the <AccessionNumber> is any one of four prefixes followed by a numeric string:

	GDSxxxx (GEO Data Set)
	GSExxxx (GEO SEries)
	GPLxxxx (GEO PLatform)
	GSMxxxx (GEO SaMple)
	Beginning in January 2007, identifiers for records in the PubChem Substance database may be included in the <DataBankList> elements (but only if the data are included in the citation XML feeds from the publishers). The PubChem project provides information on the biological activities of small molecules and its overall goal is to identify new and safer drug therapies. There are three PubChem databases: PubChem Substance, PubChem Compound, and PubChem-BioAssay. Each record in each database has a unique identifier, consisting of one or more numerical characters. The <DataBankName> is the database name, e.g., PubChem-Substance and the <AccessionNumber> is a numeric string, e.g. 10318689. In 2014, identifiers for PubChem Compound and PubChem BioAssay records may also be added to MEDLINE/PubMed records.

	Beginning in Summer 2014, dataset accession numbers in the Dryad Digital Repository and figshare may be included in the <DataBankList>. The Dryad and figshare repositories support wide varieties of datatypes and are not limited to specific scientific disciplines. The Dryad and figshare repositories are added to the <DataBankList> elements to encourage authors and publishers to include data availability information in publications for inclusion in MEDLINE/PubMed. See also <Abstract> for more information about data availability statements in STRUCTURED ABSTRACTS.
	Also, beginning in Summer 2014, dataset accession numbers in the NCBI BioProject Database may be included in the <DataBankList>. A BioProject is a collection of biological data related to a single initiative, originating from a single organization or from a consortium. A BioProject record provides users a single place to find links to the diverse data types generated for that project.

	Examples are:

	<DataBankList CompleteYN="N">
	<DataBank>
	<DataBankName>GENBANK</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>AF078607</AccessionNumber>
	<AccessionNumber>AF078608</AccessionNumber>
	<AccessionNumber>AF078609</AccessionNumber>
	<AccessionNumber>AF078610</AccessionNumber>
	<AccessionNumber>AF078611</AccessionNumber>
	<AccessionNumber>AF078612</AccessionNumber>
	<AccessionNumber>AF078613</AccessionNumber>
	<AccessionNumber>AF078614</AccessionNumber>
	<AccessionNumber>AF078615</AccessionNumber>
	<AccessionNumber>AF078616</AccessionNumber>
	<AccessionNumber>AF078617</AccessionNumber>
	<AccessionNumber>AF078618</AccessionNumber>
	<AccessionNumber>AF078619</AccessionNumber>
	<AccessionNumber>AF078620</AccessionNumber>
	<AccessionNumber>AF078621</AccessionNumber>
	<AccessionNumber>AF078622</AccessionNumber>
	<AccessionNumber>AF078623</AccessionNumber>
	<AccessionNumber>AF078624</AccessionNumber>
	<AccessionNumber>AF078625</AccessionNumber>
	<AccessionNumber>AF078626</AccessionNumber>
	<AccessionNumber>AF078627</AccessionNumber>
	<AccessionNumber>AF078628</AccessionNumber>
	<AccessionNumber>AF078629</AccessionNumber>
	<AccessionNumber>AF078630</AccessionNumber>
	<AccessionNumber>AF078631</AccessionNumber>
	<AccessionNumber>AF078632</AccessionNumber>
	<AccessionNumber>AF078633</AccessionNumber>
	<AccessionNumber>AF078634</AccessionNumber>
	<AccessionNumber>AF078635</AccessionNumber>
	<AccessionNumber>AF078636</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	</DataBankList>

	 

	<DataBankList CompleteYN="Y">
	<DataBank>
	<DataBankName>GENBANK</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>AF321191</AccessionNumber>
	<AccessionNumber>AF321192</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	<DataBank>
	<DataBankName>OMIM</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>118200</AccessionNumber>
	<AccessionNumber>145900</AccessionNumber>
	<AccessionNumber>162500</AccessionNumber>
	<AccessionNumber>605253</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	</DataBankList>

	 

	<DataBankList CompleteYN="Y">
	<DataBank>
	<DataBankName>GENBANK</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>UNKNOWN</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	</DataBankList>

	 

	<DataBankList CompleteYN="Y">
	<DataBank>
	<DataBankName>ClinicalTrials.gov</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>NCT00000161</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	</DataBank>
	</DataBankList>

	<DataBankList CompleteYN="Y">
	<DataBank>
	<DataBankName>ISRCTN</DataBankName>
	<AccessionNumberList>
	<AccessionNumber> ISRCTN46889446</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	</DataBankList>

	<DataBankList CompleteYN="Y">
	<DataBank>
	<DataBankName>GEO</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>GSE3847</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	</DataBank>
	</DataBankList>

	 

	<DataBankList>
	<DataBank>
	<DataBankName>PubChem-Substance</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>17424970</AccessionNumber>
	<AccessionNumber>17424971</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	</DataBankList>

	 

	<DataBankList>
	<DataBank>
	<DataBankName>Dryad</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>z8a11</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	<DataBank>
	<DataBankName>figshare</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>z8a11</AccessionNumber>
	</AccessionNumberList>
	</DataBank>
	</DataBankList>

	 

	<DataBankList>
	<DataBank>
	<DataBankName>BioProject</DataBankName>
	<AccessionNumberList>
	<AccessionNumber>PRJNA51041</AccessionNumber>
	</AccessionNumberList>
	</DataBankList>

Back to top

 

23. <GrantList>
This element was introduced in 1981 and contains the following elements:

<GrantID> contains the research grant or contract number (or both) that designates financial support by any agency of the United States Public Health Service or any institute of the National Institutes of Health. Additionally, beginning in late 2005, grant numbers are included for many other US and non-US funding agencies and organizations. See Grant Number Information Found in the GR Field in MEDLINE/PubMed for a complete list.

The data are generally recorded exactly as they appear in the published article; there is no attempt to standardize the numbers except as noted in the Additional information/background section below.

<Acronym> contains the 2-letter grant acronym (only used for US government funding agencies).

<Agency>For US government funding agencies, contains the institute acronym followed by the agency's hierarchical structure from lower to higher entity, when known. For other US and non-US funding agencies and organizations, contains the agency name (e.g., Wellcome Trust, Howard Hughes Medical Institute).

<Country>contains the country of the granting agency identified in the cited article.

If an article has more grant numbers than entered into MEDLINE then <GrantList CompleteYN ="N"> indicates the list is not complete in which case NLM suggests supplying the literal "etc." after the last occurrence for display purposes. Research support <PublicationType> values are not found on records with grant support data if the grant information is added to the record based on author manuscripts deposited in PMC instead of what is viewed in the published articles.

Beginning in March 2006, NLM adds GrantList data obtained from author manuscripts deposited in PMC per NIH's public access policy (see //www.pubmedcentral.nih.gov/about/authorms.html). The NIHMS (NIH Manuscript Submission System) also allows an author/researcher to associate a PMID with NIH funding support without having to deposit the manuscript (see PMID 4811796). As a result, GrantList data may now reside on MEDLINE records published prior to 1981.

A list of the possible values for the grant <Acronym> and <Agency> is available at http://www.nlm.nih.gov/bsd/grant_acronym.html. Please be advised that while NLM enters the grant number, acronym and agency values are derived by using a machine algorithm against the grant number string. This may result in some inaccurate derivations, but the overall benefit of supplying the separate acronym and agency is considered to be worth the risk of some inaccuracies.

	Examples are:
	<GrantList CompleteYN="Y">
	<Grant>
	<GrantID>GM55767</GrantID>
	<Acronym>GM</Acronym>
	<Agency>NIGMS NIH HHS</Agency>
	<Country>United States</Country>
	</Grant>
	</GrantList>

	<GrantList CompleteYN="N">
	<Grant>
	<GrantID>CA 59327</GrantID>
	<Acronym>CA</Acronym>
	<Agency>NCI NIH HHS</Agency>
	<Country>United States</Country>
	</Grant>
	<Grant>
	<GrantID>CA 64654</GrantID>
	<Acronym>CA</Acronym>
	<Agency>NCI NIH HHS</Agency>
	<Country>United States</Country>
	</Grant>
	<Grant>
	<GrantID>DK 44935</GrantID>
	<Acronym>DK</Acronym>
	<Agency>NIDDK NIH HHS</Agency>
	<Country>United States</Country>
	</Grant>
	</GrantList>

	<GrantList CompleteYN="Y">
	<Grant>
	<GrantID>057559</GrantID>
	<Agency>Wellcome Trust</Agency>
	<Country>United Kingdom</Country>
	</Grant>
	</GrantList>

	<GrantList CompleteYN="Y">
	<Grant>
	<Agency>Medical Research Council</Agency>
	<Country>United Kingdom</Country>
	</Grant>
	<Grant>
	<Agency>Wellcome Trust</Agency>
	<Country>United Kingdom</Country>
	</Grant>
	</GrantList>

	<GrantList CompleteYN="Y">
	<Grant>
	<GrantID>R01 DK060933-01A2</GrantID>
	<Acronym>DK</Acronym>
	<Agency>NIDDK NIH HHS</Agency>
	<Country>United States</Country>
	</Grant>
	<Grant>
	<GrantID>R01 DK060933-02</GrantID>
	<Acronym>DK</Acronym>
	<Agency>NIDDK NIH HHS</Agency>
	<Country>United States</Country>
	</Grant>
	</GrantList>

	<GrantList CompleteYN="Y">
	<Grant>
	<GrantID>79,533</GrantID>
	<Agency>Canadian Institutes of Health Research</Agency>
	<Country>Canada</Country>
	</Grant> </GrantList>

	<GrantList CompleteYN="Y">
	<Grant>
	<GrantID>PD/2008/1</GrantID>
	<Agency>Health Research Board</Agency>
	<Country>Ireland</Country>
	</Grant>
	</GrantList>

Additional information/background:
Through 1999 NLM entered up to 3 grant numbers for each record. Beginning in 2000, NLM began to transition to an unlimited number of grant numbers or contract numbers. Some MEDLINE citations from 2000 and 2001 may still be limited to 3 grant numbers or contract numbers, but beginning in 2002 NLM does not limit the number of grant numbers or contract numbers. Some collaborating partners record grant numbers for agencies outside the U.S. Public Health Service in the <GeneralNote> element.

Wellcome Trust and other UK funding agency GrantIDs may be all numeric (the actual grant number) or may also contain trailing identification data containing slashes followed by numeric and/or alpha characters. Initially the letters in the UK funding agency extensions have been converted to upper case. In the future it is likely that alpha characters in GrantID will appear in lower case with no conversion to upper case if present in lower case in the published article.

In some cases the prefix of NIH grant numbers was incorrectly published with a letter 'O' rather than the numeric '0'; e.g., RO1/AI45338-04 instead of R01/AI45338-04. The MEDLINE record, therefore, contained an incorrect grant number, although it agreed with the text of the article. In July 2006 NLM edited the affected records to change from capital letter O to the number 0 and introduced data entry validations to prevent this situation from occurring again. This practice deviates from standard policy in that the grant number data in the online citation may no longer match what is in the published article.

Back to top.

 

24. <PublicationTypeList>
This element is used to identify the type of article indexed for MEDLINE; it characterizes the nature of the information or the manner in which it is conveyed as well as the type of research support received (e.g., Review, Letter, Retracted Publication, Clinical Conference, Research Support, N.I.H., Extramural). Records may contain more than one <PublicationType> that are listed in alphabetical order. <PublicationTypeList> is always complete; there is no attribute to indicate completeness.

Defined for <PublicationType> with the 2015 DTD, the UI attribute carries the MeSH unique identifiers for publication types.

	An example is:

	<PublicationTypeList>
	<PublicationType UI="D016428">Journal Article</PublicationType>
	<PublicationType UI="D052061">Research Support, N.I.H., Extramural</PublicationType>
	<PublicationType UI="D016441">Retracted Publication</PublicationType>
	<PublicationType UI="D016454">Review</PublicationType>
	</PublicationTypeList>

The <PublicationType> values with their descriptions may be downloaded from //www.nlm.nih.gov/mesh. In the MeSH data, publication type headings are Record Type D and the DescriptorRecord element attribute DescriptorClass is equal to 2. A simple list of the Publication Types is available at from the PubMed online Help.

Back to top.

 

25. <VernacularTitle>
<VernacularTitle> is used for articles published in non-English languages and contains the original, untranslated title. Non-Roman alphabet language titles are transliterated. The translated titles are in <ArticleTitle> and enclosed in brackets.

	Examples of <VernacularTitle> are:

	<VernacularTitle>Temoignages et lettres.</VernacularTitle>
	<VernacularTitle>Wplyw przebiegu rozwoju plodu i noworodka na ujawnienie sie niektórych chorób okresu doroslego.</VernacularTitle>

Additional information/background:
For records in the OLDMEDLINE subset (<CitationSubset> = OM): The vernacular title for citations from the 1964 and 1965 CIM is in all upper case letters. Some OLDMEDLINE citations to articles originally published in a non-English language lack <VernacularTtitle>.

Back to top.

 

26. <ArticleDate>
<ArticleDate> contains the date the publisher made an electronic version of the article, with the month represented as a 2-digit numeric rather than an alphabetic abbreviation as is the case for the month in PubDate. A record includes <ArticleDate> only if that data is included in the publisher's electronic submission to NLM, and it may be present on records with <Article> PubModel attribute values of Electronic, Print-Electronic, Electronic-Print or Electronic-eCollection.

The attribute DateType is always used with <ArticleDate>. It represents the media of the article published on the date in that element; the only valid value is "Electronic."

Various combinations of the <Article> PubModel attribute settings and the data in <ArticleDate> permit control of which dates display in the source. Click here for information on how to interpret these data to indicate print and/or electronic publication dates when creating the source area of the PubMed citation display.

Additional information/background:
The date that NLM displays in the source area of the MEDLINE/PubMed citation display is derived from <PubDate>, not <ArticleDate> if the date a publisher submits in <ArticleDate> is identical to the date submitted for <PubDate>. The NISO standard (Z39.29-200X Bibliographic References) stipulates display of an electronic date only when it predates a subsequent issue date. Users may also wish to follow this convention. Be advised that the same intellectual date may be present in both fields using slightly different formats, i.e., the use of a leading zero in the Month or Day elements.

Back to top.

 

27. <Country>
<Country> carries the place of publication of the journal. When used in <GrantList> this element contains the country of the granting agency identified in the cited article. Valid values are those country names found in the Z category of the Medical Subject Headings (MeSH) Tree Structures that may be downloaded from //www.nlm.nih.gov/mesh. <Country> values may appear in all upper case or in mixed case. On older records, in cases where the place of publication is unknown, the <Country> value is Unknown.

	Examples are:

	<Country>United States</Country>
	<Country>UNITED STATES</Country>
	<Country>FRANCE</Country>
	<Country>Unknown</Country>

Country data are not maintained when names may change over time. These data are where the journal is published, not where the research was conducted.

Additional information/background:
For records in the OLDMEDLINE subset (<CitationSubset> = OM): Only citations from the 1964-1965 CIM carry a true country name in the <Country> element and the value is in all upper case letters. The place of publication is not available for all other citations, in which case the <Country> value is "Not Available."

Back to top.

 

28. <MedlineTA>
This element contains the standard abbreviation for the title of the journal in which an article appeared. More information about the rules currently used to construct NLM abbreviations can be found at Construction of the National Library of Medicine Title Abbreviations. See <Title> for the full journal name.

	Examples are:

	<MedlineTA>JAMA</MedlineTA>
	<MedlineTA>J Pediatr</MedlineTA>
	<MedlineTA>J Comp Physiol B</MedlineTA>
	<MedlineTA>Ann Biol Clin (Paris)</MedlineTA>

Information about journals cited in MEDLINE, including the complete title of the journal, is found in:

	NLM online catalog available at LocatorPlus (catalog.nlm.nih.gov) and NLM Catalog (//www.ncbi.nlm.nih.gov/nlmcatalog)
	SERFILE, another file that may be leased from NLM (see https://www.nlm.nih.gov/databases/download/data_distrib_main.html)
	PubMed journals files located at http://www.nlm.nih.gov/bsd/serfile_addedinfo.html (contains limited journal information; updated daily)
	The List of Serials Indexed for Online Users available at http://www.nlm.nih.gov/tsd/serials/lsiou.html.

Additional information/background:
All MEDLINE/PubMed records must be linked to a parent serial record in the NLM online catalog, NLMCatalog.
For records in the OLDMEDLINE subset (<CitationSubset> = OM): The journal's title abbreviation on OLDMEDLINE records may be different than the abbreviation found on the original citation in the printed index in which the citation was originally published.

Back to top.

 

29. <NlmUniqueID>
<NlmUniqueID> may be used to locate the complete serial record for the journal cited in MEDLINE records. The element's value is the accession number for the journal's record assigned in the NLM online catalog, LocatorPlus, available at https://catalog.nlm.nih.gov/. A <NLMUniqueID> may appear as 7 to 19 characters and is the preferred element to use when looking for the serial record for the journal in which the article was published.

	Examples are:

	The LocatorPlus accession number for the New England Journal of Medicine is 0255562 and the MEDLINE records contain:
	<NlmUniqueID>0255562</NlmUniqueID>.

	The LocatorPlus accession number for the Japanese Journal of Infectious Diseases is 100893704 and the MEDLINE records contain:
	<NlmUniqueID>100893704</NlmUniqueID>.

	The LocatorPlus accession number for Sicilia Sanitaria is 20740130R and the MEDLINE records contain: <NlmUniqueID>20740130R</NlmUniqueID>.

Back to top.

 

30. <ISSNLinking>
The ISSNLinking element contains the ISSN designated by the ISSN Network to enable co-location or linking among the different media versions of a continuing resource (separate ISSN’s are assigned for each media type in which a resource is issued). The ISSNLinking element designates the single unique ISSN for the resource, regardless of its medium. The element was defined in the 2008 DTD but was first added to records in the 2010 MEDLINE/PubMed baseline files. A relatively small number of records lack this element because the ISSN Network has not assigned some very old or very new serials a linking ISSN.

	An example is:

	<ISSNLinking>0108-7673</ISSNLinking>

Back to top.

 

31. <ChemicalList>

This element contains one or more <Chemical> elements that, in turn, contain <RegistryNumber> and <NameOfSubstance>. <ChemicalList> is always complete; there is no attribute to indicate completeness.

<RegistryNumber> contains the unique 5 to 9 digit number in hyphenated format assigned by the Chemical Abstracts Service to specific chemical substances; for enzymes, the E.C. number derived from Enzyme Nomenclature is placed in this element. Beginning with 2013 MeSH Vocabulary, Registry Number can also include Unique Ingredient Identifiers (UNIIs) from the Food and Drug Administration (FDA) Substance Registration System. A zero (0) is a valid value when an actual number cannot be located or is not yet available.

<NameOfSubstance> is the name of the substance that the registry number or the E.C. number identifies. Defined for <NameOfSubstance> with the 2015 DTD, the UI attribute carries the MeSH unique identifiers for names of the substances.

The MeSH Vocabulary database that contains all <NameOfSubstance> values with their descriptions may be downloaded from //www.nlm.nih.gov/mesh. These records are of two types: 1) Supplementary Concept Records in the MeSH file, identified with a Record Type of C, or 2) MeSH Category D descriptors identified with a Record Type of D and a tree number that begins with D.

	An example of a chemical list is:

	<Chemical List>
	<Chemical>
	<RegistryNumber>69-93-2</RegistryNumber>
	<NameOfSubstance UI="D014527">Uric Acid</NameOfSubstance>
	</Chemical>
	<Chemical>
	<RegistyNumber>6964-20-1</RegistryNumber>
	<NameOfSubstance UI="C004568">tiadenol</NameOfSubstance>
	</Chemical>
	<Chemical>
	<RegistryNumber>EC 3.1.1.34</RegistryNumber>
	<NameOfSubstance UI="D008071">Lipoprotein Lipase</NameOfSubstance>
	</Chemical>
	<Chemical>
	<RegistryNumber>EC 3.5.2.6</RegistryNumber>
	<NameOfSubstance UI="D001618">beta-Lactamases</NameOfSubstance>
	</Chemical>
	<Chemical>
	<RegistryNumber>Y92OUS2H9B</RegistryNumber>
	<NameOfSubstance UI="C013835">benphothiamine</NameOfSubstance>
	</Chemical>
	</ChemicalList>

Additional information/background: Prior to 2011, Class 1 (chemical and drug) and Class 2 (protocol) terms were housed in MeSH Supplementary Concept Records, aka SCRs, and were exported in <ChemicalList>. Beginning with 2011 MEDLINE/PubMed data when NLM began to also export Class 3 (disease) SCRs, it was deemed appropriate to reserve ChemicalList for only Class 1 terms which are true chemical or drug names and create SupplMeshList and SupplMeshName to carry Class 2 and Class 3 terms for protocols and diseases, respectively.

Back to top.

 

32. <SupplMeshList>
SupplMeshList and SupplMeshName (with its attribute Type) were first used with the 2011 DTD to house Protocol Class 2 Supplementary Concept Record (SCR) terms and Disease Class 3 SCR terms. The Type attribute distinguishes Class 2 from Class 3 terms. Defined for <SupplMeshName> with the 2015 DTD, the UI attribute carries the MeSH unique identifiers for supplemental protocols and diseases. The 2018 DTD introduced the SCRs Class 4 for Organism terms.

	Examples are:
	<SupplMeshList>
	<SupplMeshName Type="Protocol" UI="C040721">ABDIC protocol</SupplMeshName>
	<SupplMeshName Type="Protocol" UI="C034632">ABVD protocol</SupplMeshName>
	<SupplMeshName Type="Protocol" UI="C034078">CVPP protocol</SupplMeshName>
	<SupplMeshName Type="Protocol" UI="C014553">MOPP protocol</SupplMeshName>
	</SupplMeshList>

	 
	<SupplMeshList>
	<SupplMeshName Type="Disease" UI="C538248">Amyloid angiopathy</SupplMeshName>
	</SupplMeshList>

	 
	<SupplMeshList>
	<SupplMeshName Type="Organism" UI="C000623891">Tomato yellow leaf curl virus</SupplMeshName>
	</SupplMeshList>

Additional information/background: Prior to 2011, Class 1 (chemical and drug) and Class 2 (protocol) terms were housed in MeSH Supplementary Concept Records, aka SCRs, and were exported in <ChemicalList>. Beginning with 2011 MEDLINE/PubMed data when NLM began to also export Class 3 (disease) SCRs, it was deemed appropriate to reserve ChemicalList for only Class 1 terms which are true chemical or drug names and create SupplMeshList and SupplMeshName to carry Class 2 and Class 3 terms for protocols and diseases, respectively.

Back to top.

 

33. <CitationSubset>
<CitationSubset> identifies the subset for which MEDLINE records from certain journal lists or records on specialized topics were created. Some of these values are found on extremely small numbers of records. Citations may contain more than one occurrence of <CitationSubset>.

The value is true at the time the record was created; if the status of a journal changes, the value on the MEDLINE record does not change.

The values and their definitions for <CitationSubset> are as follows. Note that several are closed subsets no longer being assigned.

	AIM = citations from Abridged Index Medicus journals, a list of about 120 core clinical, English language journals.
	B = citations from non-Index Medicus journals in the field of biotechnology (not currently used).
	C = citations from non-Index Medicus journals in the field of communication disorders (not currently used).
	D = citations from dental journals.
	E = citations in the field of bioethics (includes records from the former BIOETHICS database).
	F = older citations from one journal prior to its selection for Index Medicus; used to augment the database for NLM International MEDLARS Centers (not currently used).
	H = citations from non-Index Medicus journals in the field of health administration (includes records from the former HealthSTAR database).
	IM = citations from Index Medicus journals.
	J = citations in the field of population information (not currently used; on records from the former POPLINE® database).
	K = citations from non-Index Medicus journals relating to consumer health.
	N = citations from nursing journals.
	OM = pre-1966 citations from the older print indices of the Cumulated Index Medicus (CIM) and the Current List of Medical Literature (CLML) (see more information about OLDMEDLINE). See Additional information/background: notations for specialized treatment of selected elements for OLDMEDLINE subset records, e.g., <DateCreated> and <DateCompleted>.
	Q = citations in the field of the history of medicine (includes records from the former HISTLINE® database).
	QIS = citations from non-Index Medicus journals in the field of the history of medicine. (For NLM use effective in late 2006 because they require special handling at NLM; not a subset of Q; some journals previously designated as Q are now QIS.)
	QO is subset of Q - indicates older history of medicine journal citations that were created before the former HISTLINE file was converted to a MEDLINE-like format. (For NLM use because they require special handling at NLM.)
	R = citations from non-Index Medicus journals in the field of population and reproduction (not currently used).
	S = citations in the field of space life sciences (includes records from the former SPACELINE™ database).
	T = citations from non-Index Medicus journals in the field of health technology assessment (includes records from the former HealthSTAR database).
	X = citations in the field of AIDS/HIV (includes records from the former AIDSLINE® database).

	Examples are:

	<CitationSubset>AIM</CitationSubset>
	<CitationSubset>IM</CitationSubset>
	<CitationSubset>X</CitationSubset>

Back to top.

 

34. <CommentsCorrectionsList> contains one or more <CommentsCorrections> elements that, in turn contain an associated <RefSource>, usually the associated <PMID>, and possibly a clarifying <Note>. These data pertain to and contain citations to associated journal publications, e.g., comments, errata, retractions, or cited references, and enable outside links between the record at hand to its associated citation(s).

The attribute RefType is used with <CommentsCorrections>; one or more of the following RefType valid values may reside on a record:

	AssociatedDataset cites the reference to a dataset description; began use in 2015.
	AssociatedPublication cites the reference to a scientific paper reporting on or utilitizing a dataset; began use in 2015.
	Cites lists items in the bibliography or list of references at the end of an article. Cites data currently resides on records citing articles deposited in PMC and whose citation record is in the NLM DCMS. It is possible for a citation to be present in the list of references and yet the PMID is not included in the Cites list because it is not present in the DCMS; first added to 2010 baseline file records.
	CommentOn cites the reference upon which the article comments; began use with journal issues published in 1989.
	CommentIn cites the reference containing a comment about the article; began use with journal issues published in 1989.
	ErratumIn cites the reference containing a published erratum to the article; began use in 1987.
	ErratumFor cites the original article for which there is a published erratum.
	ExpressionOfConcernIn cites the expression of concern (appears on citation for original article); began use in 2017.
	ExpressionOfConcernFor cites the original article for which there is an expression of concern; began use in 2017.
	RepublishedFrom cites the original article subsequently corrected and republished; began use in 1987.
	RepublishedIn cites the final, correct version of a corrected and republished article; began use in 1987.
	RetractionOf cites the article being retracted; began use in August 1984.
	RetractionIn cites the reference containing a retraction of the article; began use in August 1984.
	UpdateIn cites the reference containing an update to the article; began limited use in 2001.
	UpdateOf cites the article being updated; limited use; began limited use in 2001.
	SummaryForPatientsIn cites the reference containing a patient summary article; began use in Nov. 2001 (these records contain Publication Type, Patient Education Handout). See the article 'Patient Education Handouts in MEDLINE®/PubMed®' in the NLM Technical Bulletin for more information.
	OriginalReportIn cites a scientific article associated with a patient summary.
	ReprintIn cites the subsequent (and possibly abridged) version of a republished article; began use in 2006.
	ReprintOf cites the first, originally published article; began use in 2006.

<RefSource> contains the citation of the associated record.
<PMID> contains the PMID of the associated record (if available) thus providing a link between a citation and the citation of its related RefType, such as a comment, erratum, retraction, or item in its bibliography.
<Note> clarifies the data in <CommentsCorrections> and is used infrequently. It is most often used with RefType = ErratumIn for corrected author names (see <AuthorList>), correction of dosage errors in published abstracts or full text, and sometimes with RefType = RetractionOf and RefType = RetractionIn for when only part of an overall citation is retracted (as when only one abstract in a proceedings is retracted). Contents of <Note> include:

	added is used when an author name is added to the citation as the result of a published erratum
	removed when an author name is removed
	Dosage error in published abstract; MEDLINE/PubMed abstract corrected (used with RefType = ErratumIn)
	Dosage error in article text (used with RefType = ErratumIn)
	abstract no. xxx only for an erratum of a numbered abstract which is part of an overall citation
	abstract by author names on page xxx only when an erratum refers to an unnumbered abstract which is authored and part of an overall citation. The author names and page numbers of the abstract are included.
	abstract abstract title on page xxx only when an erratum refers to an unnumbered abstract which is not authored. In this case, the abstract title and page number are included.

Additional information/background:
Some <CommentCorrection> elements do not have the PMID present. For some, a PMID will never exist where there are only one-way links; for others, record maintenance must take place before NLM can supply the correct PMID and these corrected records will eventually be distributed as Revised records. Journal title abbreviations with RefType = CommentOn and CommentIn in records through the 2000 production year end with a period whereas journal title abbreviations in citations with other RefType values (such as ErratumIn) may not end with a period. This apparent discrepancy is a result of parsing the data as it moved from one field to another during conversion from the legacy system in 2000. Current data entry convention is to use a period after the journal title abbreviation. <RefSource> for RetractionOf and RetractionIn may contain author names.

For records in the OLDMEDLINE subset (<CitationSubset> = OM): CommentsIn is the only RefType value currently found on OLDMEDLINE records, although others may be used in the future.

See the NLM Errata webpage at https://www.nlm.nih.gov/bsd/policy/errata.html for additional information.

	Examples are:

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="Cites">
	<RefSource>Psychosom Med. 2008 Jun;70(5):539-45</RefSource>
	<PMID VersionID = "1">18519880</PMID>
	</CommentsCorrections>
	<CommentsCorrections RefType="Cites">
	<RefSource>Psychosom Med. 2008 Jun;70(5):531-8</RefSource>
	<PMID VersionID = "1">18541904</PMID>
	</CommentsCorrections>
	<CommentsCorrections RefType="Cites">
	<RefSource>Lancet. 2002 May 25;359(9320):1851-6</RefSource>
	<PMID VersionID = "1">12044394</PMID>
	</CommentsCorrections>
	<CommentsCorrections RefType="Cites">
	<RefSource>JAMA. 2006 Aug 9;296(6):679-90</RefSource>
	<PMID VersionID = "1">16896111</PMID>
	</CommentsCorrections>
	<CommentsCorrections RefType="Cites">
	<RefSource>Am J Psychiatry. 1988 Aug;145(8):976-81</RefSource>
	<PMID VersionID = "1">2969199</PMID>
	</CommentsCorrections>
	<CommentsCorrections RefType="CommentOn">
	<RefSource>PLoS Med. 2009 Jan 27;6(1):e11</RefSource>
	<PMID VersionID = "1">19175285</PMID>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="ErratumIn">
	<RefSource>J Infect Dis 1998 Aug;178(2):601</RefSource>
	<Note>Whitely RJ [corrected to Whitley RJ]</Note>
	</CommentsCorrections>
	<CommentsCorrections RefType="RetractionOf">
	<RefSource>Dunkel EC, de Freitas D, Scheer DI, Siegel ML, Zhu Q, Whitley RJ, Schaffer PA, Pavan-Langston D. J Infect Dis. 1993 Aug;168(2):336-44</RefSource>
	<PMID VersionID = "1">8393056</PMID>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="ErratumIn">
	<RefSource>HIV Clin Trials. 2009 Mar-Apr;10(2):vi</RefSource>
	<Note>Dosage error in published abstract; MEDLINE/PubMed abstract corrected</Note>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="ErratumIn">
	<RefSource>Adv Chronic Kidney Dis. 2006 Oct;13(4):433</RefSource>
	<Note>Dosage error in article text</Note>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="RetractionOf">
	<RefSource>Gut. 2001 Mar;48 Suppl 1:A1-124</RefSource>
	<PMID VersionID = "1">11286195</PMID>
	<Note>abstract no. 071 only</Note>
	</RetractionOf>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="ErratumIn">
	<RefSource>Mol Pharmacol 1997 Mar;51(3):533</RefSource>
	</CommentsCorrections>
	<CommentsCorrections RefType="RetractionIn">
	<RefSource>Wu D, Yang CM, Lau YT, Chen JC. Mol Pharmacol. 1998 Feb;53(2):346</RefSource>
	<PMID VersionID = "1">9499167</PMID>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="SummaryForPatientsIn">
	<RefSource>Ann Intern Med. 2002 Dec 17;137(12):I43</RefSource>
	<PMID VersionID = "1"<12484739</PMID>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="OriginalReportIn">
	<RefSource>Ann Intern Med. 2010 Feb 2;152(3):152-8</RefSource>
	<PMID VersionID = "1">20124231</PMID>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="CommentOn">
	<RefSource>Ann Intern Med. 2001 Apr 17;134(8):663-94</RefSource>
	<PMID VersionID = "1">11304107</PMID>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="CommentIn">
	<RefSource>Med Clin (Barc). 2005 Mar 26;124(11):439</RefSource>
	<PMID VersionID = "1">15799859</PMID>
	</CommentsCorrections>
	<CommentsCorrections RefType="CommentIn">
	<RefSource>Ann Intern Med. 2002 Jun 18;136(12):926-7; author reply 926-7</RefSource>
	<PMID VersionID = "1">12069567</PMID>
	</CommentsCorrections>
	<CommentsCorrections RefType="CommentIn">
	<RefSource>Ann Intern Med. 2002 Jun 18;136(12):926-7; author reply 926-7</RefSource>
	<PMID VersionID = "1">12069568</PMID>
	</CommentsCorrections>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="ErratumIn">
	<RefSource>Antivir Ther. 2007;12(7):1145</RefSource>
	<Note>Colatigli, Manuela [corrected to Colafigli, Manuela; Cattani, Paola [added]; Pannetti, Carmen [corrected to Pinnetti, Carmen] </Note>
	</CommentsCorrections>
	</CommentsCorrectionsList>

	<CommentsCorrectionsList>
	<CommentsCorrections RefType="ErratumIn">
	<RefSource>Surg Endosc. 2007 Aug;21(8):1473</RefSource>
	<Note>Francesco, M [removed]; Moccia, F [added]</Note>
	</CommentsCorrections>
	</CommentsCorrectionsList>

The following is how NLM uses <CommentsCorrections> data for display purposes: For each <CommentsCorrections> RefType in the record except Cites, take the RefType value and make it a constant label with a space between the label’s two words and only the first word has an initial capital letter. For example: RefType=”RetractionIn” would produce the label 'Retraction in:'. Follow each label with a colon, space, and the content of the associated <RefSource> tag, followed by the content of the associated <Note>, if present. Exceptions to the label rule:

	For RefType = CorrectedFrom and RepublishedFrom, create the label 'Corrected and republished from:'.
	If there are multiple occurrences of a label, repeat literal label and separate with a period, space.
	RefType Cites data display in PubMed at NLM only in the XML display format.

	Examples are:

	Retraction in: Gut. 2001 Jun;48(6):873. abstract no. 071 only
	Retraction in: Wu D, Yang CM, Lau YT, Chen JC. Mol Pharmacol. 1998 Feb;53(2):346
	Original report in: Ann Intern Med. 2002 Jun 18;136(12):884-7
	Erratum in: Nature 2001 Jun 7;411(6838):720. Szustakowki, J [corrected to Szustakowski, J]

Back to top.

 

35. <GeneSymbolList>: not currently input
<GeneSymbol> contains the "symbol" or abbreviated form of gene names as reported in the literature. This element resides in records processed at NLM from 1991 through 1995. <GeneSymbol> has a maximum length of 72 characters, although few, if any, gene symbols contain the maximum length. Up to 25 occurrences per record may appear; however <GeneSymbolList> is always complete in the XML record; there is no attribute to indicate completeness. NLM entered the symbols used by authors; there was no authority list or effort to standardize the data.

	Examples are:

	<GeneSymbolList>
	<GeneSymbol>pyrB</GeneSymbol>
	<GeneSymbol>Ghox-lab</GeneSymbol>
	<GeneSymbol>pulC</GeneSymbol>
	</GeneSymbolList>

Additional information/background:
In the gene symbol field, SGML is used to designate Greek characters, superscripts, and subscripts that may appear as part of the gene symbol. The ampersand (&) and semicolon (;) are the respective beginning and ending delimiters for Greek characters with specified alphabetic codes to designate the appropriate letter and whether it is upper or lower case. The less than/greater than signs are used to define superscripted and subscripted regions. The beginning of a super-scripted region will be designated <up> while </up> signals its end. Similarly, <down> indicates the beginning of a sub-scripted region; while </down> indicates the end. A table, originally published on page 32 of the Sep - Oct 1990 NLM Technical Bulletin, displays the code designations for the Greek characters and may be found at http://www.nlm.nih.gov/bsd/license/greek_characters.html.

Back to top.

 

36. <MeshHeadingList>
NLM controlled vocabulary, Medical Subject Headings (MeSH®), is used to characterize the content of the articles represented by MEDLINE citations. Records in MedlineCitation status = MEDLINE contain current MeSH headings. Records in the OLDMEDLINE subset now also contain <MeshHeadingList>. See Additional Information. The only MEDLINE records that do not contain MeSH headings are retractions of publications (see Fact Sheet). Of the various MeSH headings assigned to a record, those representing the most significant points are identified with the MajorTopic attribute set to Y for Yes. It is under those major descriptors that the citation can be located in Index Medicus. NLM stopped publishing Index Medicus as a print publication in 2004. The remaining descriptors are used to identify concepts which have also been discussed in the item, but that are not the primary topics. See MeSH homepage for information about MeSH. Only records in Completed MedlineCitation Status contain MeSH headings. Each <MeshHeading> in <MeshHeadingList> contains <DescriptorName> and often <QualifierName>. <MeshHeadingList> is always complete; there is no attribute to indicate completeness.

The MajorTopic attribute for <DescriptorName> is set to Y (for Yes) when the MeSH Heading alone is a central concept of the article (without a QualifierName).

Defined for <DescriptorName> with the 2011 DTD, the Type attribute with its valid value Geographic, is used to distinguish MeSH geographic subject terms in Category Z of MeSH from other subject terms.

Defined for <DescriptorName> and <QualifierName> with the 2015 DTD, the UI attribute carries the MeSH unique identifiers for descriptors and qualifiers.

The presentation of <DescriptorName> is alphabetical. The <QualifierName> associated with a <DescriptorName> is also in alphabetical order, disregarding presence of the MajorTopic attribute.

	Examples are:

	<MeshHeadingList>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" UI="D000328">Adult</DescriptorName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" UI="D002318">Cardiovascular Diseases</DescriptorName>
	<QualifierName MajorTopicYN="N" UI="Q000209">etiology</QualifierName>
	<QualifierName MajorTopicYN="Y" UI="Q000401">mortality</QualifierName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" UI="D004740">English Abstract</DescriptorName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" UI="D005317">Fetal Growth Retardation</DescriptorName>
	<QualifierName MajorTopicYN="N" UI="Q000150">complications</QualifierName>
	<QualifierName MajorTopicYN="Y" UI="Q000503">physiopathology</QualifierName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" UI="D006801">Humans</DescriptorName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" Type="Geographic" UI="D014481">United States</DescriptorName>
	</MeshHeading>
	</MeshHeadingList>

In the above example, the mortality aspect of cardiovascular diseases and the physiopathology aspect of fetal growth retardation are the central concepts of the article. Note that the MeSH Heading English Abstract (also present in above example) means that a substantive English language abstract is present in the journal or written by one of the NLM collaborating data producers. The abstract may or may not be present in the MEDLINE citation as the input policy changed over the years. There are many older non-English language citations without abstracts in MEDLINE but with the MeSH Heading English Abstract; this indicates that an English abstract is present in the journal, even if not a part of the online record.

	<MeshHeadingList>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" UI="D000818">Animals</DescriptorName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" UI="D004285">Dogs</DescriptorName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" Type="Geographic" UI=D019083">Mediterranean Region</DescriptorName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="Y" UI="D009200">Myocardial Contraction</DescriptorName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" UI="D009206">Myocardium</DescriptorName>
	<QualifierName MajorTopicYN="Y" UI="Q000378">metabolism</QualifierName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="Y" UI="D010101">Oxygen Consumption</DescriptorName>
	</MeshHeading>
	<MeshHeading>
	<DescriptorName MajorTopicYN="N" UI="D013500">Surface Tension</DescriptorName>
	</MeshHeading>
	</MeshHeadingList>

In the above example, myocardial contraction, the metabolism aspect of myocardium, and oxygen consumption are the central concepts of the article.

Additional information/background:
For records in the OLDMEDLINE subset (<CitationSubset> = OM): NLM has undertaken an OLDMEDLINE <Keyword>-to-<MeSH Heading> mapping project. This project maps the original subject headings assigned to the citations when they appeared in the older print indexes to the current MeSH vocabulary. The original subject headings reside in <KeywordList> and the current MeSH Headings to which they map reside in <MeshHeadingList>.

Most MeSH Headings assigned to an OLDMEDLINE record have the MajorTopic attribute set to Y for Yes.

Back to top

 

37. <NumberOfReferences>: not currently input
This element appears on records indexed with Review, Consensus Development Conference, Consensus Development Conference, NIH, or Meta-Analysis as a <PublicationType>; these data were not input for 'regular' journal articles. <NumberOfReferences> contains the number of bibliographic references listed in the article. As of October 1, 2010 NLM discontinued the practice of including the number of bibliographic references listed in articles cited in MEDLINE. This change was prospective only; we did not remove number of references data from existing citations.

	An example is:

	<NumberOfReferences>21</NumberOfReferences>

Additional information/background:
When collaborating partners recorded the number of references for non-review articles, these data are found in the <GeneralNotes> element.

Back to top.

 

38. <PersonalNameSubjectList>
Individuals' names appear in <PersonalNameSubject> for citations that contain a biographical note or obituary, or are entirely about the life or work of an individual or individuals. Data is entered in the same format as author names in <AuthorList> including <LastName>, <ForeName>, <Suffix>, and <Initials>. See <AuthorList> for details of format. <PersonalNameSubjectList> is always complete; there is no attribute to indicate completeness.

	An example is:

	<PersonalNameSubjectList>
	<PersonalNameSubject>
	<LastName>Koop</LastName>
	<ForeName>C Everett</ForeName>
	<Initials>CE</Initials>
	</PersonalNameSubject>
	</PersonalNameSubjectList>

Additional information/background:
An anonymous biography or obituary has the person's name in this element but the <AuthorList> is absent.

Back to top

 

39. <OtherID>
<OtherID> may reside on a record owned by a collaborating partner or on an NLM-owned record to which a.) a collaborating partner added additional information not originally included by NLM on the record or b.) PMC or NIH Manuscript System identifiers are present. <OtherID> and its Source attribute identifies a.) the organization responsible for the information on the citation or the document where the information originated, and b.) a unique number for that citation or document. The field may be multiply occurring.

If a partner created the record, the <OtherID>, in that case, is also the internal tracking number for the source document located at the partner's site. For example, a partner may add <Keyword> data to an NLM owned record.

If the publisher has embargoed access to the full text, the date of availability in PMC will be noted as part of the OtherID data. When the embargo is lifted, a revised record with the date of availability removed will be released. In that case the <OtherID> will contain the PMCID for the journal article.

The element <OtherID> has one or more of the Source attributes identifying the collaborating partner listed below. Some of the values on this list currently are not in use at this time and some may never be used.

NASA - National Aeronautics and Space Administration; not currently used
KIE - Kennedy Institute of Ethics, Georgetown University; not currently used
PIP - Population Information Program, Johns Hopkins School of Public Health; not currently used
POP - former NLM POPLINE database; not currently used
ARPL - Annual Review of Population Law; not currently used
CPC - Carolina Population Center; not currently used
IND - Population Index; not currently used
CPFH - Center for Population and Family Health Library/Information Program; not currently used
CLML - Current List of Medical Literature
IM - Index Medicus; reserved for future use (intended for pre-1966 publications)
QCICL - Quarterly Cumulative Index to Current Literature; reserved for future use (intended for pre-1966 publications)
QCIM - Quarterly Cumulated Index Medicusreserved for future use (intended for pre-1966 publications)
SGC - Surgeon General's Catalog; reserved for future use
NRCBL - National Reference Center for Biomedical Literature (for the KIE Reference Library shelving location)
NLM – U.S. National Library of Medicine (for the PMC or NIH Manuscript System identifiers)

	Examples are:

	<OtherID Source="KIE">101133</OtherID>
	<OtherID Source="NRCBL">14.1</OtherID>
	<OtherID Source="NLM">PMC373290</OtherID>
	<OtherID Source="NLM">PMC2442205 [Available on 12/30/08]</OtherID>
	<OtherID Source="NLM">PMC2762775.2</OtherID>

Additional information/background:
The Prefix attribute for OtherID is not used with MEDLINE/PubMed data.

For records in the OLDMEDLINE subset (<CitationSubset> = OM): This element, currently occurring only on 1950-1959 data, is for internal use at NLM. CLML is currently the Source attribute for all OLDMEDLINE citations containing <OtherID>; the Source IM may also be used on a limited basis. Other Sources that may be defined for future use with OLDMEDLINE records are QCICL and QCIM.

	An example is:

	<OtherID Source="CLML">5834:20412:395</OtherID>

Back to top.

 

40. <OtherAbstract>
NLM creates MEDLINE records without <Abstract> when the source journal article does not contain an abstract. Whether or not there is an <Abstract>, a collaborating partner or other entity (identified in the <OtherAbstract> Type attribute) may create an <OtherAbstract> for that record. If a partner creates and provides an abstract for <OtherAbstract>, the internal tracking number of the source document used by the collaborating partner resides in <OtherID>. <CopyrightInformation> to indicate authorship or editing of abstract is associated with <OtherAbstract> on a very small number of records.

The element <OtherAbstract> can have one or more of the Type attributes listed below:

AAMC - American Association of Medical Colleges; not currently used
AIDS - Special HIV/AIDS publications with abstracts written by someone other than the author
KIE - Kennedy Institute of Ethics, Georgetown University; not currently used
PIP - Population Information Program, Johns Hopkins School of Public Health; not currently used
NASA - National Aeronautics and Space Administration; not currently used
Publisher - journal editorial staff, typically for citations to older articles that did not contain abstracts when originally published

With the 2013 DTD, Language attribute was added to OtherAbstract so that NLM can indicate on behalf of publishers that there are additional abstracts available at the publishers' Web sites or elsewhere. The MEDLINE/PubMed record will not carry the abstract. Instead, <AbstractText> of <OtherAbstract> will include a standard phrase such as "Abstract available in Spanish from the publisher." The phrase will be supplied by publishers and they will use the <OtherAbstract> Language attribute to indicate the language of the abstract available at their Web site.

Back to top.

 

41. <KeywordList>
<KeywordList> contains controlled terms in <Keyword> that describe the content of the article. Except for OLDMEDLINE subset records (CitationSubset = OM), Keywords are assigned by a collaborating data producer. Not all MEDLINE data producers supply Keywords; those that do use their own list of specialized terms which may change during the year. Keywords on OLDMEDLINE subset records are the original subject headings found in the old printed indexes used to create the records (see 'Additional information/background' note below).

Beginning in January 2013, the <KeywordList> with Owner attribute NOTNLM contains author-written keywords in <Keyword>. Author-written keywords describe the content of the article and are supplied by publishers. When the KeywordList Owner is NOTNLM, the Keyword MajorTopic attribute is always N.

Keywords, when present, appear in addition to MeSH Headings, except some OLDMEDLINE status records do not yet contain current MeSH Headings. The same Keyword may exist in more than one Keyword List.

<KeywordList> is always complete; there is no attribute to indicate completeness. The element <KeywordList> can have one or more of the Owner attributes listed in <MedlineCitation>, which identifies the organization that assigned the subject terms. Other than OLDMEDLINE subset records, relatively few records in the database contain this element and the only Owner attributes currently in use with <KeywordList> are:

NASA - National Aeronautics and Space Administration; not currently used
PIP - Population Information Program, Johns Hopkins School of Public Health; not currently used
KIE - Kennedy Institute of Ethics, Georgetown University; not currently used
NLM - National Library of Medicine (used for the OLDMEDLINE records)
NOTNLM - author-written keywords provided by publishers - NLM began using this value in January 2013
HHS - U.S. Department of Health and Human Services - added with the 2012 DTD but is not yet in use and NLM is uncertain when it will begin to be used

	Examples:

	<KeywordList Owner="NASA">
	<Keyword MajorTopicYN="N">NASA Discipline Space Human Factors</Keyword>
	<Keyword MajorTopicYN="N">Non-NASA Center</Keyword>
	</KeywordList>

	<KeywordList Owner="KIE">
	<Keyword MajorTopicYN="N">Birth Rate</Keyword>
	<Keyword MajorTopicYN="N">Doe v. Bolton</Keyword>
	<Keyword MajorTopicYN="N">Empirical Approach</Keyword>
	<Keyword MajorTopicYN="N">New York</Keyword>
	<Keyword MajorTopicYN="N">Roe v. Wade</Keyword>
	<Keyword MajorTopicYN="Y">United States</Keyword>

	</KeywordList>

	<KeywordList Owner="NLM">
	<Keyword MajorTopicYN="Y">DIABETIC DIET</Keyword>
	<Keyword MajorTopicYN="Y">DIET, REDUCING</Keyword>
	<Keyword MajorTopicYN="Y">HEART DISEASES/nutrition and diet</Keyword>
	</KeywordList>

	<KeywordList Owner="NOTNLM">
	<Keyword MajorTopicYN="N">apnea syndrome</Keyword>
	<Keyword MajorTopicYN="N">cardiovascular disease</Keyword>
	<Keyword MajorTopicYN="N">self management</Keyword>
	</KeywordList>

Additional information/background:
For records in the OLDMEDLINE subset (<CitationSubset> = OM): NLM has undertaken an OLDMEDLINE <Keyword>-to-<MeSH Heading> mapping project. This project maps the original subject headings assigned to the citations when they appeared in the older print indexes to the current MeSH vocabulary. OLDMEDLINE Keywords were first mapped to current MeSH in preparation for the NLM 2006 production year. Additional mappings occur as resources permit.

The following are characteristics of OLDMEDLINE subset Keywords:
* <KeywordList> contains the original MeSH Headings assigned at the time the articles were first indexed and included in one of the indexes printed prior to 1966. These data have not been updated, and may not match current MeSH vocabulary.
* Fewer subject headings (approximately two to six per citation) were usually assigned and check tags were generally not used.
* There are no subheadings on records published in the 1950 and 1951 CLML and the 1963 through 1965 CIM; Keywords from other years may contain MeSH Heading/subheading combinations.
* All Keywords are flagged as Major Topic (although that cannot be utilized for searching this data in PubMed).
* The KeywordList Owner attribute is "NLM".

Back to top

42. <SpaceFlightMission>: not currently input
<SpaceFlightMission> resides on MEDLINE citations created by one of our collaborating data producers, the National Aeronautics and Space Administration (NASA). This element contains the space flight mission name and/or number when results of research conducted in space are covered in a publication. In cases where there are multiple space flight missions, the mission name is not directly linked to the descriptive values manned/unmanned or long/short duration that also reside in the <SpaceFlightMission> element in the MEDLINE record. For records containing more than one Space Flight Mission name, see the Space Flight Mission Summary Table at https://wayback.archive-it.org/org-350/https://www.nlm.nih.gov/bsd/space_flight.html that provides the manned/unmanned status and duration of each mission.

In October 2005 NLM discontinued the practice of adding space flight mission names and/or numbers to MEDLINE citations. This change was prospective only; we did not remove data from existing citations. See the NLM Technical Bulletin article NLM® and NASA Collaborative Arrangement for Space Life Sciences Data Ceases for more information.

	Examples are:

	<SpaceFlightMission>Flight Experiment</SpaceFlightMission>
	<SpaceFlightMission>STS Shuttle Project</SpaceFlightMission>
	<SpaceFlightMission>manned</SpaceFlightMission>
	<SpaceFlightMission>short duration</SpaceFlightMission>

	<SpaceFlightMission>Biosatellite 2 Project</SpaceFlightMission>
	<SpaceFlightMission>Flight Experiment</SpaceFlightMission>
	<SpaceFlightMission>Project Gemini 11</SpaceFlightMission>
	<SpaceFlightMission>manned</SpaceFlightMission>
	<SpaceFlightMission>short duration</SpaceFlightMission>
	<SpaceFlightMission>unmanned</SpaceFlightMission>

Back to top.

 

43. <InvestigatorList>

Historically, <InvestigatorList> resided only on MEDLINE citations created or maintained by one of the NLM collaborating data producers, the National Aeronautics and Space Administration (NASA). In this context, <InvestigatorList> identifies the NASA funded principal investigator(s) who conducted the research discussed in the article cited (but are not necessarily the authors).

In October 2005 NLM discontinued the practice of adding NASA investigators to MEDLINE citations. This change was prospective only; we did not remove data from existing citations. See the NLM Technical Bulletin article NLM® and NASA Collaborative Arrangement for Space Life Sciences Data Ceases for more information.

Beginning with the 2008 production year, InvestigatorList is also used to contain personal names of individuals (e.g., collaborators and investigators) who are not authors of a paper but rather are listed in the paper as members of a collective/corporate group that is an author of the paper. For records containing more than one collective/corporate group author, InvestigatorList does not indicate to which group author each personal name belongs. In this context, the names are entered in the order that they are published; the same name listed multiple times is repeated because NLM can not make assumptions as to whether those names are the same person. Also see the Collaborator Names section of the NLM Fact Sheet: Authorship in MEDLINE.

Data is entered in the same format as author names in <Author> including <LastName>, <ForeName>, <Initials>, <Suffix>, <Identifier>, and <AffiliationInfo>.

<Identifier> was added to <InvestigatorList> with the 2010 DTD, but is not yet in use. It is defined to contain a unique identifier associated with the name. The value in the Identifier attribute Source will designate the organizational authority that established the unique identifier. Identifier was renamed from NameID with the 2013 DTD.

A mocked up future example is:

	<Identifier Source=“NCBI”>123456</Identifier> 

<Investigator> may also contain <AffiliationInfo>. <AffiliationInfo> was added to <Investigator> with the 2015 DTD. The <AffiliationInfo> envelope element includes <Affliliation> and <Identifier>. <Affliliation> identifies the organization that the researcher was affiliated with at the time the article was written. <Identifier> is a unique identifier for the organization. Up until 2014 and unlike <Affiliation> associated with Author names, this affiliation data does not include detailed address information. Starting in 2014, NLM includes the affiliation of each Investigator name when submitted by publishers with the XML data for MEDLINE citations. NLM will not perform quality control of the affiliation data or edit it to add “USA” or e-mail address. With the addition of the <AffiliationInfo> envelope in 2015, NLM can include multiple affiliations for individual investigators as well as institutional (affiliation) identifiers in MEDLINE citations.

The attribute ValidYN is used on each Investigator occurrence to indicate the true spelling of the name (some published investigator names are subsequently corrected by the publishers and NLM retains both versions in the MEDLINE/PubMed record). ValidYN=Y (present for most investigator names) indicates the spelling of the name is correct; ValidYN=N indicates the spelling of the name is not correct, per publisher's erratum published in the journal. <InvestigatorList> is always complete; there is no attribute to indicate completeness.

	Examples are:

	<InvestigatorList>
	<Investigator ValidYN="Y">
	<LastName>Mattioni</LastName>
	<ForeName>Thomas</ForeName>
	<Initials>T</Initials>
	</Investigator>
	<Investigator ValidYN="Y">
	<LastName>Swarup</LastName>
	<ForeName>Vijay</ForeName>
	<Initials>V</Initials>
	</Investigator>
	</InvestigatorList>

	<InvestigatorList>
	<Investigator ValidYN="Y">
	<LastName>Wood</LastName>
	<ForeName>D G</ForeName>
	<Initials>DG</Initials>
	<AffiliationInfo>
	<Affiliation>Vanderbilt U, Nashville, TN</Affiliation>
	</AffiliationInfo>
	</Investigator>
	<Investigator ValidYN="N">
	<LastName>Wood</LastName>
	<ForeName>D L</ForeName>
	<Initials>DL</Initials>
	<AffiliationInfo>
	<Affiliation>Vanderbilt U, Nashville, TN</Affiliation>
	</AffiliationInfo>
	</Investigator>
	</InvestigatorList>

Back to top.

 

44. <GeneralNote>
<GeneralNote> contains supplemental or descriptive information related to the document cited in the MEDLINE record. It is a 'catchall' for various types of information included by NLM collaborating producers or by NLM.

<GeneralNote> can have one or more of the Owner attributes listed below:

	NLM - National Library of Medicine
	NASA - National Aeronautics and Space Administration; not currently used
	PIP - Population Information Program; Johns Hopkins School of Health; not currently used
	KIE - Kennedy Institute of Ethics, Georgetown University; not currently used
	HSR - National Information Center on Health Services Research and Health Care Technology, National Library of Medicine
	HMD - History of Medicine Division, National Library of Medicine
	SIS - Division of Specialized Information Services, National Library of Medicine; not used
	NOTNLM - not used by NLM.

<GeneralNote> Owner attribute = NLM and <DateCompleted> for former MedlineCitation Status = PubMed-not-MEDLINE Records:

Beginning in March 2009 GeneralNote element with Owner attribute = NLM is used to contain a <DateCompleted> value for records previously exported in MedlineCitation Status = PubMed-not-Medline (out-of-scope records) which are released again in MedlineCitation Status = In-Process and then again, ultimately, as completed MEDLINE records in MedlineCitation Status = MEDLINE. This situation will arise typically, but not always, if NLM has received XML journal citation back files from publishers for years of publication that precede the date of coverage in MEDLINE, and subsequently the journal is approved for MEDLINE coverage for years of publication covered in those XML files. The records will first be re-exported in MedlineCitation Status = In-Process. After further processing (e.g., assignment of MeSH Headings) they will be released again in their final MEDLINE status. At the time the records are released in In-Process status, the DateCompleted element that was on the PubMed-not-Medline version of the record is removed and the original DateCompleted value is placed in the GeneralNote field. When the record is subsequently released in MEDLINE status, a new DateCompleted value is assigned and resides on the record and the original DateCompleted date remains in GeneralNote. Prior to March 2009 NLM similarly reprocessed citations such as these, however, the workflow did not generate a new DateCompleted date or populate GeneralNote to house the former date. Instead, a DateRevised value was placed on those records.

	Examples are:

	<GeneralNote Owner="KIE">42 refs.</GeneralNote>
	<GeneralNote Owner="KIE">Approved by the ACP Board of Regents on 23 Mar 1992 and by the IDSA Council on 21 Mar 1993.</GeneralNote>
	<GeneralNote Owner="KIE">Adopted by the APHA Governing Council 3 Oct 1990.</GeneralNote>
	<GeneralNote Owner="KIE">KIE BoB Subject Heading: INFORMED CONSENT/INSTITUTIONALIZED PERSONS/MENTALLY ILL</GeneralNote>
	<GeneralNote Owner="KIE">KIE Bib: allowing to die/legal aspects; euthanasia/legal aspects; suicide</GeneralNote>
	**Note: BoB Subject Headings are controlled subject vocabulary terms found in the Kennedy Institute of Ethics' Bioethics Thesaurus under which citations print in their publication, Bibliography of Bioethics. The current format of these data in MEDLINE is reflected in the second example beginning with "KIE Bib".
	<GeneralNote Owner="KIE">118 fn.</GeneralNote>
	**Note: "fn" is an abbreviation for "footnotes"
	<GeneralNote Owner="KIE">Full author name: Weber, James</GeneralNote>
	<GeneralNote Owner="KIE">Broden, Melodie S; Agresti, Albert A</GeneralNote>
	<GeneralNote Owner="NASA">Grant numbers: NSG 155-61, NAS- 95637.</GeneralNote>
	<GeneralNote Owner="NLM">Original DateCompleted: 20080603</GeneralNote>

Back to top.

 

45. <CoiStatement>
<CoiStatement> element contains a conflict of interest statement as provided by the publisher. This field was introduced in 2017.


45. <PubmedData>
<PubmedData> includes a set of citation data elements not included in the <MedlineCitation> section. <PubmedData> is an envelop element that contains the <History>, <PublicationStatus>, and <ArticleIDList>.


46. <History>
<History> contains the dates associated with the published article and its PubMed citation's history. Each PubMedPubDate in the History has a PubStatus to indicate the significance of the date. These dates may pertain to either:

	Article history: Dates indicating when the history of the article's publication, i.e. when it was received, accepted, revised, or retracted. It may also include additional dates of publication that are secondary to the <PubDate> and <ArticleDate> provided in the <Article> data.
	Citation processing: Dates indicating how the citation was processed by NLM for Entrez, PubMed, MEDLINE or PMC.


<History> is an envelop element that contains the <PubmedPubDate>.

47. <PubmedPubDate>
<PubmedPubDate> Specifies a date significant to either the article's history or the citation's processing.
All <History> dates will have a <Year>, <Month>, and <Day> elements. Some may have an <Hour>, <Minute>, and <Second> element(s).

The element has one attribute, Pubstatus. The following are valid attribute values:

	received
	accepted
	epublish
	ppublish
	revised
	aheadofprint
	retracted
	ecollection
	pmc
	pmcr
	pubmed
	pubmedr
	premedline
	medline
	medliner
	entrez
	pmc-release



47. <PublicationStatus>
<PublicationStatus> Indicates the publication status of the article, i.e. whether the article is a ppublish, epublcih, or ahead of print, as determined by the article's primary publication date.


47. <ArticleIdList>
<ArticleIdList> Lists ArticleID values associated with the article.
<ArticleIdList> contains the element <ArticleId>

The element <ArticleId> specifies an identification number significant to either the article's history or the citations processing and has one attribute, IdType. The @IdType attribute indicates what the date signifies. The following are valid entries:

	doi
	pii
	pmcpid
	pmpid
	pmc
	mid
	sici
	pubmed
	medline
	pmcid



45. <DeleteCitation>
PMIDs in DeleteCitation are for records previously distributed in any status and subsequently determined to be not within MEDLINE's or PubMed's coverage or to be duplicate citations. It is possible that a deleted citation can be distributed without a previous version ever going out. This would happen infrequently when the creation and completion of a new record, or error resolution of a previously created record, and deletion action occurs on the same day.

Coverage deletes: Most of the citation data in PubMed is submitted to NLM electronically by journal publishers. The publishers are instructed not to submit certain types of records because they are not covered by MEDLINE or PubMed. Examples of these are: book reviews, software or equipment reviews, announcements, erratum notices without additional substantive content, and papers to appear in forthcoming issues. Contrary to instructions, publishers do sometimes submit citations outside of NLM coverage which are distributed in In-Data-Review status. As a result of routine checks, these record types are subsequently discovered and deleted.

Duplicate deletes: Publishers may accidentally submit citations that they have already submitted, or new records can otherwise be created for already existing citations, creating duplicate records which are also deleted as soon as they are discovered. Occasionally a publisher submits an issue electronically using incorrect volume, issue, or publication date data. These incorrect files are often deleted and resent correctly later rather than NLM trying to edit the files.

Back to top.