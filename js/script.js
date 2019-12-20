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
    }
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';
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
}    
