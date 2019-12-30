'use strict';
{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Przycisk został wciśnięty');
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
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
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';
  function generateTitleLinks(customSelector = ''){
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
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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
  function generateTags(){
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for every article: */
    for (const article of articles) {
      /* [DONE] find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);      
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags: ', articleTags);
      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray, ', articleTagsArray);
      /* START LOOP: for each tag */
      for (const tag of articleTagsArray) {
        console.log('tag: ', tag);
        /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#' + articleTags + '"><span>' + articleTagsArray + '</span></a></li>';
        /* [DONE] add generated code to html variable */
        html = html + linkHTML;
      /* END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
      /* END LOOP: for every article: */
    }
  }
  generateTags();
  function tagClickHandler(event){
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
    generateTitleLinks(customSelector);
    console.log('customSelector: ', customSelector);
}
function addClickListenersToTags(){
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
}