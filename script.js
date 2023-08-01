function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

window.onload = () => {
    const image2 = document.getElementById("image2");
    const image2_container = document.getElementById("image2-container");
    const image2_wrapper = document.getElementById("image2-wrapper");
    const main_container = document.getElementById("main");
    const vertical_line = document.getElementById("vertical-line");
    const slider_button = document.getElementById("slider-button");

    const main_container_width = main_container.offsetWidth;
    const main_container_height = main_container.offsetHeight;

    const is_touch_device = isTouchDevice();

    const mouse_down_event = is_touch_device ? "touchstart" : "mousedown";
    const mouse_up_event = is_touch_device ? "touchend" : "mouseup";
    const mouse_move_event = is_touch_device ? "touchmove" : "mousemove";

    image2_wrapper.style.width = `${main_container_width}px`;
    image2_wrapper.style.height = `${main_container_height}px`;
    vertical_line.style.height = `${main_container_height}px`;

    function slide_image(value_in_percentage) {
        image2_wrapper.style.width = `${main_container_width}px`;
        image2_wrapper.style.height = `${main_container_height}px`;
        image2.style.left = `${value_in_percentage}%`;
        vertical_line.style.left = `${value_in_percentage}%`;
        image2_container.style.right = `${value_in_percentage}%`;
    }

    let prev_pos_x;

    let prev_btn_pos = get_absolute(main_container_width / 2);

    function start_dragging(e) {
        prev_pos_x = is_touch_device ? e.touches[0].clientX : e.clientX;
        document.addEventListener(mouse_move_event, drag_element);
        document.addEventListener(mouse_up_event, stop_dragging);
    }

    function change_position(pos) {
        slider_button.style.left = `${pos}px`;
        prev_pos_x = pos;
        prev_btn_pos = pos;
    }

    function get_absolute(value) {
        return Math.abs(value);
    }

    function drag_element(e) {
        const left_limit = get_absolute(slider_button.offsetWidth / 2);
        const right_limit = main_container_width - get_absolute(slider_button.offsetWidth / 2);
        const new_pos_x = is_touch_device ? e.touches[0].clientX : e.clientX;
        const mouse_steps = new_pos_x - prev_pos_x;
        new_btn_pos = prev_btn_pos + mouse_steps;
        if (new_btn_pos < left_limit) {
            change_position(left_limit);
        } else if (new_btn_pos > right_limit) {
            change_position(right_limit);
        } else {
            slider_button.style.left = `${new_btn_pos}px`;
        }
        prev_pos_x = new_pos_x;
        prev_btn_pos = new_btn_pos;
        const value_in_percentage = (parseInt(slider_button.style.left, 10) * 100) / main_container_width;
        slide_image(get_absolute(value_in_percentage));
    }

    function stop_dragging(e) {
        const left_limit = get_absolute(slider_button.offsetWidth / 2)
        const right_limit = main_container_width - left_limit;
        if (prev_btn_pos > right_limit) {
            prev_btn_pos = right_limit;
            prev_pos_x = right_limit;
        } else if (prev_btn_pos < left_limit) {
            prev_btn_pos = left_limit;
            prev_pos_x = left_limit;
        }
        document.removeEventListener(mouse_up_event, stop_dragging);
        document.removeEventListener(mouse_move_event, drag_element);
    }

    slider_button.addEventListener(mouse_down_event, start_dragging);

}

// Made with 💖 by Bidhan Acharya.