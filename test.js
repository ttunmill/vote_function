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
`;

// 투표버튼 클릭
$(document).on('click', '.vote_btn', function() {
    if ($('.vote_contents_area_bg').length == 0) {
        $('.vote_btn').after(vote_modal);
    } else {
        $('.vote_contents_area_bg').show();
    }
    vote_update();
})

// 투표모달창 닫기경우
$(document).on('click', '.close_vote_contents', function() {
    $('.vote_contents_area_bg').hide()
})

// 투표모달창 항목추가 눌렀을경우
$(document).on('click', '#addItem', function() {
    let vote_list = $(this).parent().siblings('.vote_list');
    let li_length = $(this).parent().siblings('.vote_list').children().length;
    vote_list.append(`<li><input type="text" placeholder="항목 입력" name="item_${++li_length}" required><span class="remove_item"><i class="fa-solid fa-xmark"></i></span></li>`)
    vote_update()
})

// 투표모달창 x버튼 눌렀을경우
$(document).on('click', '.remove_item', function() {
    $(this).parent().remove();
    vote_update()
})

// 투표모달창 항목입력칸 [2칸 이하 x버튼 삭제], [3칸 이상일 경우 x버튼 생성]
function vote_update() {
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
    chk_inp()
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

//수정 버튼 클릭하였을 경우
$(document).on('click', '#editVote', function() {
    chk_inp()
})

function chk_inp() {
    let title = $('.top_title .title').val()
    let inp_val = ''
    let flag = true;

    $('.vote_list li input').each(function() {
        inp_val = $(this).val()
        if(inp_val == '') {return flag = false;}
    })
    
    if(title == '' || flag == false) {
        alert('제목 또는 항목을 입력해야합니다.')
    } else {
        $('.vote_contents_area_bg').hide()
        inputValue()
    }
    $('.vote_contents_create #editVote').attr('id', 'createVote')
}

// 버튼 퍼센트 계산식
$(document).on('click', '.vote_option', function() {
    let button = $(this);
    let buttons = $('.vote_val_list button');
    let button_cnt = buttons.length;

    if ($('.vote_val_list .percent').length && !button.hasClass('active')) {
        return false;
    }

    if (button.hasClass('active')) {
        buttons.find('span').css("color", "#000");
        $('.vote_result_area .edit').show();
        $('.vote_val_list .percent').remove();
        $('.vote_fill').css("transform", "0");
        $('.vote_fill').width(0);
        buttons.removeClass('active');
    } else {
        buttons.removeClass('active');
        button.addClass('active');
        $('.vote_result_area .edit').hide();

        const random_arr = [];
        let sum = 0;
        // 난수 생성 및 합계 계산
        for (let i = 0; i < button_cnt - 1; i++) {
            const randomNum = Math.floor(Math.random() * (100 - sum - (button_cnt - i - 1)));
            random_arr.push(randomNum);
            sum += randomNum;
        }

        // 마지막 요소는 100에서 현재 합계를 뺀 값으로 설정
        random_arr.push(100 - sum);
        
        let max_val = Math.max.apply(Math, random_arr);
        let remain = random_arr.filter((element) => element !== max_val);

        buttons.each(function(idx) {
            if ($(this).hasClass('active')) {
                $(this).html(`<span>${$(this).text()}</span><span class="percent"> (${max_val}%)</span><span class="vote_fill"></span>`);
                $(this).find('.vote_fill').width(`${max_val}%`);
                $(this).find('.vote_fill').css("transform", "none");
                $(this).find('span').css("color", "red");
            } else {
                $(this).html(`<span>${$(this).text()}</span><span class="percent"> (${remain[0]}%)</span><span class="vote_fill"></span>`);
                $(this).find('.vote_fill').width(`${remain[0]}%`);
                $(this).find('.vote_fill').css("transform", "none");
                $(this).find('span').css("color", "red");
                remain.shift();
            }
        });
    }
});