
let vote_modal = `
    <div class="vote_contents_area_bg">
        <form id="vote_contents_area">
            <span class="close_vote_contents"><i class="fa-solid fa-xmark"></i></span>
            <div class="top_title">
                <input type="text" placeholder="투표 제목을 입력하세요" name="poll_subject" class="title" required>
            </div>
            <div class="vote_inputs">
                <ul class="vote_list">
                    <li><input type="text" placeholder="항목 입력" name="item_1" required><span class="remove_item"><i class="fa-solid fa-xmark"></i></span></li>
                    <li><input type="text" placeholder="항목 입력" name="item_2" required><span class="remove_item"><i class="fa-solid fa-xmark"></i></span></li>
                </ul>
                <div class="vote_input_add">
                    <button type="button" id="addItem">+ 항목 추가</button>
                </div>
                <p>투표는 3일 후 종료됩니다.</p>
                <div class="vote_contents_create">
                    <button type="button" id="createVote">투표 만들기</button>
                </div>
            </div>
        </form>
    </div>
`

$(document).on('click', '.vote_btn', function() {
    // $('.vote_contents_create #editVote').attr('id', 'createVote')
    // $('.vote_contents_create #createVote').text('투표 만들기')
    if ($('.vote_contents_area_bg').length == 0) {
        $('.vote_btn').after(vote_modal);
    } else {
        $('.vote_contents_area_bg').show();
    }
    update();
})

// 투표버튼 클릭
/* $('.vote_btn').on('click', function() {
    $('.vote_contents_create #createVote').text('투표 만들기')
    if ($('.vote_contents_area_bg').length == 0) {
        $('.vote_btn').after(vote_modal);
    } else {
        $('.vote_contents_area_bg').show();
    }
    update();
}); */

// 투표모달창 닫기경우
$(document).on('click', '.close_vote_contents', function() {
    $('.vote_contents_area_bg').hide()
})

// 투표모달창 항목추가 눌렀을경우
$(document).on('click', '#addItem', function() {
    let vote_list = $(this).parent().siblings('.vote_list');
    let li_length = $(this).parent().siblings('.vote_list').children().length;
    vote_list.append(`<li><input type="text" placeholder="항목 입력" name="item_${++li_length}" required><span class="remove_item"><i class="fa-solid fa-xmark"></i></span></li>`)
    update()
})

// 투표모달창 x버튼 눌렀을경우
$(document).on('click', '.remove_item', function() {
    $(this).parent().remove();
    update()
})

// 투표모달창 항목입력칸 [2칸 이하 x버튼 삭제], [3칸 이상일 경우 x버튼 생성]
function update() {
    let item_cnt = $('.vote_list li').length;

    $('.vote_list li').each(function(idx) {
        let num = idx + 1;
        $(this).find('input').attr('name', `item_${num}`);

        if (item_cnt > 2) {
            $(this).find('.remove_item').show();
        } else {
            $(this).find('.remove_item').hide();
        }

        if (item_cnt > 2) {
            if (!$(this).find('.remove_item')) {
                $(this).append(`<span class="remove_item"><i class="fa-solid fa-xmark"></i></span>`);
            }
        }
    });
}

// 투표모달창 투표만들기 눌렀을경우
$(document).on('click', '#createVote', function() {
    let title = $('.top_title .title').val()
    let inp_val = ''
    $('.vote_contents_create #createVote').text('투표 만들기')

    $('.vote_list li input').each(function() {
        inp_val = $(this).val()
    })
    
    
    if(title == '' || inp_val == '') {
        alert('제목 또는 항목을 입력해야합니다.')
    } else {
        $('.vote_contents_area_bg').hide()
        inputValue()
    }
})

// 모달창 값 반환하여 HTML에 출력
function inputValue() {
    let title = $('.top_title .title').val()
    let vote_design = '<div class="vote_result_area">';
    vote_design += `<p class="top_tit"><span class="tit">${title}</span><button type="button" class="edit">수정</button></p>`;
    vote_design += `<ul class="vote_val_list">`;
    $('.vote_list li input').each(function() {
        vote_design += `<li><button type="button" class="vote_option">${$(this).val()}</button></li>`
    })
    vote_design += `</ul>`;
    vote_design += `</div>`;

    
    let chk_id = $('.vote_contents_create').children().attr('id')
    
    if(chk_id == 'createVote') {
        $('.btn_wrap').after(vote_design);    
    } else if(chk_id == 'editVote') {
        $('.vote_result_area').remove();
        $('.btn_wrap').after(vote_design);
    }

    
}

// create후 수정클릭하였을 경우
$(document).on('click', '.vote_result_area .top_tit .edit', function() {
    $('.vote_contents_area_bg').show();
    $('.vote_contents_create #createVote').text('수정하기')
    $('.vote_contents_create #createVote').attr('id', 'editVote')
})

$(document).on('click', '#editVote', function() {
    let title = $('.top_title .title').val()
    let inp_val = ''

    $('.vote_list li input').each(function() {
        inp_val = $(this).val()
    })
    
    if(title == '' || inp_val == '') {
        alert('제목 또는 항목을 입력해야합니다.')
    } else {
        $('.vote_contents_area_bg').hide()
        inputValue()
    }
    $('.vote_contents_create #editVote').attr('id', 'createVote')
})


/* $(document).on('click', '.vote_option', function() {
    let buttons = $('.vote_val_list button');
    let buttonCount = buttons.length;
    let maxRandom = 100;
    let randomValues = [];

    for (let i = 0; i < buttonCount; i++) {
        randomValues.push(0);
    }

    let remaining = maxRandom;
    for (let i = 0; i < buttonCount - 1; i++) {
        let value = Math.floor(Math.random() * remaining);
        randomValues[i] = value;
        remaining -= value;
    }
    randomValues[buttonCount - 1] = remaining;

    buttons.each(function(idx) {
        $(this).html(`${$(this).text()}<span class="persent"> (${randomValues[idx]}%)</span>`);
    });
}); */


/* $(document).ready(function() {
    $(document).on('click', '.vote_option', function() {
        let buttons = $('.vote_val_list button');
        let buttonCount = buttons.length;
        let maxRandom = 100;
        let randomValues = [];
        
        $('.vote_result_area .edit').show();

        if ($('.vote_val_list .persent').length) {
            $('.vote_val_list .persent').remove();
        } else {
            for (let i = 0; i < buttonCount; i++) {
                randomValues.push(0);
            }

            let remaining = maxRandom;
            for (let i = 0; i < buttonCount - 1; i++) {
                let value = Math.floor(Math.random() * remaining);
                randomValues[i] = value;
                remaining -= value;
            }
            randomValues[buttonCount - 1] = remaining;

            buttons.each(function(idx) {
                $(this).html(`${$(this).text()}<span class="persent"> (${randomValues[idx]}%)</span>`);
            });
        }
    });
}); */