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

  // 画像のwidthが固定で、SP表示で記事本文のstyleが崩れたので、max-widthを設定
  $('img').each((_, elm) => {
    $(elm).html();
    $(elm).attr('style', 'max-width: 80vw;');
  });

  // githubのh2っぽく下線を引く。また、section間の余白を少し広げる。
  $('h2').each((_, elm) => {
    $(elm).html();
    $(elm).attr('style', 'margin-top: 1em; border-bottom: 2px solid #666; display: inline-block; padding: 0 6px 6px 6px;');
  });

  // 字が詰まって読みにくいので、その対応
  $('body').attr('style', 'line-height: 1.9; letter-spacing: 0.06em;');

  return $.html();
}