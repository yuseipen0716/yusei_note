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

  // data-filename属性を持つdivタグにファイル名表示用の要素を追加
  $('div[data-filename]').each(function () {
    const filename = $(this).data('filename') as unknown as string;
    const filenameElement = $('<div>').addClass('filename-label').text(filename);
    $(this).prepend(filenameElement);
  });

  return $.html();
}