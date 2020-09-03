let listLoad = {
    label: "My list",
    itens: []
};
let list = {
    label: "My list",
    itens: []
};
let nextItemId = 1;
let total = 0.00;
let target = 0.00;

function newList(){
    let r = confirm("Iniciar nova lista?");
    if(r){
        list.itens = [];
        $("#main_list_ul").empty();
        target = 0;
        updateInfo();
        toggleEditTarget(true,null,true);
    }
}

function addNewItem(){
    let value = $("#add_item_input_value").val();
    let info = $("#add_item_input_info").val();    
    if(value){
        addItemList(Number(format(value)), info);
        updateInfo();
    }    
    $("#add_item_input_value").focus();
    $("#add_item_input_value").val("");
    $("#add_item_input_info").val("");
}

function addItemList(value, info = ""){
    let newItem = {
        id: nextItemId,
        value: value,
        info: info,
    };
    list.itens.push(newItem);
    nextItemId++;
    let id = `main_list_item_${newItem.id}`;
    let htmlItem = `<li id="${id}" class="list_item" style="display: none"><p class="list_item_value color_info">$${value}</p> <p class="list_item_info">${info}</p><button class="background_error btn_round" onclick="removeItem(${newItem.id})"><img src="image/ic_cancel_black.png"/></button></li>`;
    $("#main_list_ul").append(htmlItem);
    $(`#${id}`).show(200);

}

function removeItem(id){    
    let remove_value = 0;
    list.itens = list.itens.filter((item) => {
        if(item.id === id) remove_value = item.value;
        return item.id !== id;        
    });
    $(`#main_list_item_${id}`).hide(200, () => {
        $(`#main_list_item_${id}`).remove();
    });
    updateInfo();
}

function changeInfo(){
    let value = $("#main_info_input_target").val();
    let label = $("#main_info_input_label").val();
    if(value && value > 0){
        target = Number(format(value));
        $("#main_info_target").text(`Limit: $ ${target}`);
        updateInfo();
    }
    list.label = label;
    let label_show = list.label.length < 15 ? list.label : `${list.label.substring(1,15)}...`;
    $("#main_info_label").text(label_show);
}

function updateInfo(){
    total = 0;
    list.itens.forEach(item => total += item.value);
    total = format(total);    
    let rest = target > 0 ? format(target - total) : 0;
    $("#main_info_target").text(`Limit: $ ${target}`);
    $("#main_info_total").text(`Total: $ ${total}`);
    $("#main_info_rest").text(`Rest: $ ${rest}`);
    if(rest > 0){
        $("#main_info_rest").addClass("color_success");
    }else{
        $("#main_info_rest").addClass("color_error");
    }
}

function toggleEditTarget(animate, hide, show){
    let turn_visible = (show != null) || (!$("#main_info_edit_items").is(":visible") && !hide);
    if(!turn_visible){
        $("#main_info_edit").show(animate ? 200 : 0);
        $("#main_info_edit_items").hide(animate ? 200 : 0);
    }else{
        $("#main_info_edit").hide(animate ? 200 : 0);
        $("#main_info_edit_items").show(animate ? 200 : 0);
        $("#main_info_input_target").val("");
        $("#main_info_input_target").focus();
    }
}

function toggleAddItens(animate, hide, show){
    let turn_visible = (show != null) || (!$("#add_item_panel").is(":visible") && !hide);
    if(!turn_visible){
        $("#add_item_btn").show(animate ? 200 : 0);
        $("#add_item_panel").hide(animate ? 200 : 0);
    }else{
        $("#add_item_btn").hide(animate ? 200 : 0);
        $("#add_item_panel").show(animate ? 200 : 0);
        $("#add_item_input_value").val("");
        $("#add_item_input_value").focus();
    }
}

function loadList(){    
    if(listLoad && listLoad.itens && listLoad.itens.length > 0){
        listLoad.itens.forEach((item) => {
            addItemList(item.value, item.info)
        });
    }
}

function format(value){
    return Math.round(value*100)/100;
}

$( document ).ready(function() {
    updateInfo();
    toggleEditTarget();
    toggleAddItens();
    loadList();
});