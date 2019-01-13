export const MODIFYPAGE = 'MODIFYPAGE';

export function modifyPage(pageType, value) {
    return {
        type: MODIFYPAGE,
        pageType: pageType,     //pageType 0:현재 메뉴의 리스트를 보여주기, 1:현재 선택된 글의 내용을 보여주기
        value: value,            //pageType이 0일때는 메뉴 번호, pageType이 1일때는 글 번호
    };
}
