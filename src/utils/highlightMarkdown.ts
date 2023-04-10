import cheerio from "cheerio";
import hljs from "highlight.js";

export function highlightMarkdown(html: string) {
  const $ = cheerio.load(html);
  // codeブロックの部分のsyntax highlightを行う。
  // 初回アクセス時にもスタイルが当たっているように。
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  // p code部分にも網掛けのスタイルを当てたい
  //（当たっているが、サイトの背景色の関係で見えないため。網掛けを濃く）
  $('p code').each((_, elm) => {
    $(elm).html();
    $(elm).addClass('hljs');
  });

  $('img').each((_, elm) => {
    $(elm).html();
    $(elm).attr('style', 'max-width: 80vw;');
  });

  $('h2').each((_, elm) => {
    $(elm).html();
    $(elm).attr('style', 'margin-top: 1em; border-bottom: 2px solid #666; display: inline-block; padding: 0 6px 6px 6px;');
  });

  $('body').attr('style', 'line-height: 1.9; letter-spacing: 0.06em;');

  return $.html();
}