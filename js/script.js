/* eslint-disable indent, no-inner-declarations */
'use strict';
{
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
        authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
        authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
    };

    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Element kliknięty! Wyświetlam zawartość event:', event);
        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /* [DONE] add class 'active' to the clicked link */
        console.log('clickedElement: ', clickedElement);
        clickedElement.classList.add('active');
        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.post');
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        /* [DONE] get 'href' attribute from the clicked link */
        const clickedLink = clickedElement.getAttribute('href');
        console.log('clickedLink: ', clickedLink);
        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(clickedLink);
        console.log('Article: ', targetArticle);
        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    };
    let optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author',
        optAuthorsListSelector = '.authors.list',
        optTagsListSelector = '.list.tags',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-';

    function generateTitleLinks(customSelector = '') {
        /* [DONE] remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        let html = '';
        /* [DONE] for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        for (const article of articles) {
            /* [DONE] get the article id */
            const articleId = article.getAttribute('id');
            /* [DONE] find the title element */
            /* [DONE] get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* [DONE] create HTML of the link */
            // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            const linkHTMLData = {id: articleId, title: articleTitle};
            const linkHTML = templates.articleLink(linkHTMLData);
            console.log('linkHTML: ', linkHTML);
            /* [DONE] insert link into html variable */
            html = html + linkHTML;
        }
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');
        console.log('link: ', links);
        for (const link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();

    function calculateTagsParams(tags) {
        const params = {
            max: 0,
            min: 999999
        };
        for (let tag in tags) {
            console.log(tag + ' is used ' + tags[tag] + ' times');
            if (tags[tag] > params.max) {
                params.max = tags[tag];
            }
            if (tags[tag] < params.min) {
                params.min = tags[tag];
            }
        }
        return params;
    }

    function calculateTagClass(count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
        return classNumber;
    }

    function generateTags() {
        /* [NEW] create a new variable allTags with an empty object */
        let allTags = {};
        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* START LOOP: for every article: */
        for (const article of articles) {
            /* find tags wrapper */
            let tagList = article.querySelector(optArticleTagsSelector);
            /* make html variable with empty string */
            let html = '';
            const articleTags = article.getAttribute('data-tags');
            const articleTagsArray = articleTags.split(' ');
            /* START LOOP: for each tag */
            for (const tag of articleTagsArray) {
                /* generate HTML of the link */
                //const linkHTML = `<li><a href="#tag-${tag}"><span>${tag}</a></li>`;
                const linkHTMLData = {id: tag, title: tag};
                const linkHTML = templates.tagLink(linkHTMLData);
                /* add generated code to html variable */
                html += linkHTML;
                if (!allTags[tag]) {
                    /* [NEW] add tag to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
            }
            /* END LOOP: for each tag */

            /* insert HTML of all the links into the tags wrapper */


            tagList.innerHTML = html;
        }
        /* END LOOP: for every article: */
        /* [NEW] find list of tags in right column */
        const tagsList = document.querySelector(optTagsListSelector);

        const tagsParams = calculateTagsParams(allTags);
        console.log('tagsParams:', tagsParams);

        /* [NEW] create variable for all links HTML code */
        // let allTagsHTML = '';

        /* [NEW] START LOOP: for each tag in allTags: */
        const allTagsData = {tags: []};
        for (let tag in allTags) {
            /* [NEW] generate code of a link and add it to allTagsHTML */
            allTagsData.tags.push({tag, count:allTags[tag],className: calculateTagClass(allTags[tag], tagsParams)});
        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        tagsList.innerHTML = templates.tagCloudLink(allTagsData);

    }

    generateTags();

    function tagClickHandler(event) {
        /* [DONE] prevent default action for this event */
        event.preventDefault();

        /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');

        /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');

        /* [DONE] find all tag links with class active */
        const tagsActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');

        /* START LOOP: for each active tag link */
        for (const tagActiveLinks of tagsActiveLinks) {
            /* [DONE] remove class active */
            tagActiveLinks.classList.remove('active');
            /* END LOOP: for each active tag link */
        }
        /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
        const tagsLinks = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for (const tagLinks of tagsLinks) {
            /* [DONE] add class active */
            tagLinks.classList.add('active');
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        const customSelector = '[data-tags~="' + tag + '"]';
        generateTitleLinks(customSelector);
        console.log('customSelector: ', customSelector);
    }

    function addClickListenersToTags() {
        /* [DONE] find all links to tags */
        const tagLinks = document.querySelectorAll('[href^="#tag-"]');
        console.log('tagsLinks: ', tagLinks);

        /* START LOOP: for each link */
        for (const link of tagLinks) {
            /* [DONE] add tagClickHandler as event listener for that link */
            link.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }
    }

    addClickListenersToTags();

    function generateAuthors() {
        let allAuthors = {};
        const articles = document.querySelectorAll(optArticleSelector);
        for (const article of articles) {
            const authorWrapper = article.querySelector(optArticleAuthorSelector);
            const author = article.getAttribute('data-author');
            const linkHTMLData = {id: author, title: author};
            const linkHTML = templates.authorLink(linkHTMLData);


            //obliczanie allAuthors
            if (!allAuthors[author]){
                allAuthors[author] = 1;
            } else
            {
                allAuthors[author]++;
            }
            authorWrapper.innerHTML = linkHTML;
        }
        const authorsList = document.querySelector(optAuthorsListSelector);
        const allAuthorsData = {authors: []};
        for (let author in allAuthors) {
            allAuthorsData.authors.push({author, count:allAuthors[author]});
        }
        authorsList.innerHTML = templates.authorListLink(allAuthorsData);
    }

    generateAuthors();

    function authorClickHandler(event) {
        event.preventDefault();
        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const author = href.replace('#author-', '');
        const authorsActiveLinks = document.querySelectorAll('a[href^="#author-"]');
        for (const authorActiveLinks of authorsActiveLinks) {
            authorActiveLinks.classList.remove('active');
        }
        const authorsLinks = document.querySelectorAll('a[href="' + href + '"]');
        for (const authorLinks of authorsLinks) {
            authorLinks.classList.add('active');
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        const customSelector = '[data-author="' + author.replace('#', '') + '"]';
        generateTitleLinks(customSelector);
        console.log('customSelector: ', customSelector);
    }

    function addClickListenersToAuthors() {
        /* [DONE] find all links to authors */
        const authorLinks = document.querySelectorAll('[href^="#author-"]');
        console.log('authorLinks: ', authorLinks);

        /* START LOOP: for each link */
        for (const link of authorLinks) {
            /* [DONE] add authorClickHandler as event listener for that link */
            link.addEventListener('click', authorClickHandler); //JAK WYWOŁAĆ PO KLIKNIĘCIU
            /* END LOOP: for each link */
        }
    }

    addClickListenersToAuthors();
}
