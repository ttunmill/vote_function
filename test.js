
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

// 투표버튼 클릭
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
    let button_cnt = buttons.length;
    let random_max = 100;
    let random_val = [];

    for (let i = 0; i < button_cnt; i++) {
        random_val.push(0);
    }

    let remaining = random_max;
    for (let i = 0; i < button_cnt - 1; i++) {
        let value = Math.floor(Math.random() * remaining);
        random_val[i] = value;
        remaining -= value;
    }
    random_val[button_cnt - 1] = remaining;

    buttons.each(function(idx) {
        $(this).html(`${$(this).text()}<span class="persent"> (${random_val[idx]}%)</span>`);
    });
}); */


// $(document).ready(function() {
//     $(document).on('click', '.vote_option', function() {
//         const button = $(this);
//         const buttons = $('.vote_val_list button');
//         const button_cnt = buttons.length;
//         const random_max = 100; // 퍼센트의 총합
//         const random_val = [];

//         // 퍼센트 값이 이미 있는 경우 클릭 비활성화
//         if ($('.vote_val_list .persent').length && !button.hasClass('active')) {
//             return; // 퍼센트 값이 이미 있으면 클릭 비활성화
//         }

//         // 클릭된 버튼이 active 상태이면 수정 가능
//         if (button.hasClass('active')) {
//             // 수정 버튼 보이기 및 퍼센트 값 초기화
//             $('.vote_result_area .edit').show();
//             $('.vote_val_list .persent').remove(); // 퍼센트 값 제거
//             buttons.removeClass('active'); // 모든 버튼에서 active 클래스 제거
//         } else {
//             // 모든 버튼에서 active 클래스 제거
//             buttons.removeClass('active');
//             // 클릭된 버튼에만 active 클래스 추가
//             button.addClass('active');
//             $('.vote_result_area .edit').hide(); // 수정 버튼 숨기기

//             // 랜덤 비율 생성 및 할당
//             let remaining = random_max;
//             for (let i = 0; i < button_cnt - 1; i++) {
//                 // 난수를 생성하여 총합을 초과하지 않도록 처리
//                 let value = Math.floor(Math.random() * (remaining + 1));
//                 random_val.push(value);
//                 remaining -= value;
//             }
//             // 마지막 버튼에 남은 값을 할당하여 총합이 정확히 100이 되도록 함
//             random_val.push(remaining);

//             // 퍼센트 값이 있는 버튼에 가장 높은 퍼센트 할당
//             const max_percent = Math.max(...random_val);

//             // 버튼에 퍼센트 값 추가
//             buttons.each(function(idx) {
//                 if ($(this).hasClass('active')) {
//                     $(this).html(`${$(this).text()}<span class="persent"> (${max_percent}%)</span>`);
//                 } else {
//                     $(this).html(`${$(this).text()}<span class="persent"> (${random_val[idx] /* || 0 */}%)</span>`);
//                 }
//             });
//         }
//     });

//     // 수정 버튼 클릭 시 상태 초기화
//     $(document).on('click', '.vote_result_area .edit', function() {
//         $('.vote_val_list button').removeClass('active'); // 모든 버튼에서 active 클래스 제거
//         $('.vote_result_area .edit').hide(); // 수정 버튼 숨기기
//         $('.vote_val_list .persent').remove(); // 퍼센트 값 제거
//     });
// });

$(document).on('click', '.vote_option', function() {
    const button = $(this);
    const buttons = $('.vote_val_list button');
    const button_cnt = buttons.length;
    const random_max = 100;
    let random_val = [];

    if ($('.vote_val_list .persent').length && !button.hasClass('active')) {
        return false;
    }

    if (button.hasClass('active')) {
        $('.vote_result_area .edit').show();
        $('.vote_val_list .persent').remove();
        buttons.removeClass('active');
    } else {
        buttons.removeClass('active');
        button.addClass('active');
        $('.vote_result_area .edit').hide();

        let remaining = random_max;
        for (let i = 0; i < button_cnt - 1; i++) {
            let value = Math.floor(Math.random() * (remaining - (button_cnt - i - 1)) + 1);
            random_val.push(value);
            remaining -= value;
        }

        random_val.push(remaining);

        const max_percent = Math.max(...random_val);

        let filteredValues = random_val.filter(value => value !== max_percent);
        let newrandom_val = [];
        let total = random_max - max_percent;

        for (let i = 0; i < button_cnt - 1; i++) {
            let value = Math.floor(Math.random() * (total - (button_cnt - i - 1)) + 1);
            newrandom_val.push(value);
            total -= value;
        }

        newrandom_val.push(total);

        buttons.each(function(idx) {
            if ($(this).hasClass('active')) {
                $(this).html(`${$(this).text()}<span class="persent"> (${max_percent}%)</span>`);
            } else {
                $(this).html(`${$(this).text()}<span class="persent"> (${newrandom_val[idx] /* || 0 */}%)</span>`);
            }
        });
    }
});


$(document).on('click', '.vote_result_area .edit', function() {
    $('.vote_val_list button').removeClass('active'); 
    $('.vote_result_area .edit').hide(); 
    $('.vote_val_list .persent').remove();
});