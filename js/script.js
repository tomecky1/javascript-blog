/* eslint-disable linebreak-style */
'use strict'; {
  document.getElementById('test-button').addEventListener('click', function () {
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  })
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
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.list .tags',
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
    //JAK NAPISAĆ TĄ FUNKCJĘ
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return classNumber;
  }

  function generateTags() {
    const articles = document.querySelectorAll(optArticleSelector);
    let allTags = {};

    for (const article of articles) {
      let tagList = article.querySelector(optArticleTagsSelector);
      let html = '';

      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for (const tag of articleTagsArray) {
        const linkHTML = `<li><a href="#tag-${tag}"><span>${tag}</a></li>`;

        html = html + linkHTML;

        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else
          allTags[tag]++;
      }

      tagList.innerHTML = html;
      const tagsParams = calculateTagsParams(allTags);
      console.log('tagsParams', tagsParams);


      let allTagsHTML = '';

      for (const tag in allTags) {
        const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
        console.log('tagLinkHTML:', tagLinkHTML);

        allTagsHTML += tagLinkHTML;
      }

      tagList = document.querySelector('.tags');
      tagList.innerHTML = allTagsHTML;
    }
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
    /* find all authors */
    const authors = document.querySelectorAll(optArticleAuthorSelector);
    for (const author of authors) {
      // const authorList = author.innerHTML;
      // let html = '';
      const articleAuthor = author.getAttribute('data-author');
      console.log('articleAuthor: ', articleAuthor);
      const authorElement = document.createElement('a');
      authorElement.setAttribute('href', `#${articleAuthor}`);
      authorElement.innerText = articleAuthor;
      author.appendChild(authorElement);
    }
  }
  generateAuthors();

  function authorClickHandler(event) { //HELP NIE OGARNIAM CZY TO JEST OK
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
    const authorLinks = document.querySelectorAll('.post-author a');
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