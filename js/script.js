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
  function generateTitleLinks(){
  /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    let html = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
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
      const articleTags = article.getAttribute(optArticleTagsSelector);
      console.log('articleTags: ', articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray, ', articleTagsArray);
      /* START LOOP: for each tag */
      for (const tag of articleTagsArray) {
        console.log('tag: ', tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#' + articleTags + '"><span>' + articleTagsArray + '</span></a></li>';
        /* add generated code to html variable */
        html = html + linkHTML;
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
      /* END LOOP: for every article: */
    }
  }
  generateTags();
}