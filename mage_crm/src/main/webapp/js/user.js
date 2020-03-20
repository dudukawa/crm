function searchUsers() {
    $("#dg").datagrid("load",{
        userName:$("#userName").val(),
        trueName:$("#trueName").val(),
        phone:$("#phone").val(),
        email:$("#email").val()
    });
}
function openAddUserDialog() {
    $("#dlg").dialog("open").dialog("setTitle","用户信息添加");
    $("#fm").form("clear");
}
function closeDialog() {
    $("#dlg").dialog("close");
}
function saveOrUpdateUser() {
    var id = $("#id").val();
    var url = ctx+"/user/update";
    if(isEmpty(id)){
        url = ctx+"/user/insert";
    }
    $("#fm").form("submit",{
        url:url,
        onSubmit:function () {
            return $("#fm").form("validate");
        },
        success: function (data) {
            data = JSON.parse(data);
            if(data.code==200){
                $.messager.alert("来自crm",data.msg,"info");
                searchUsers();
                closeDialog();
            }else{
                $.messager.alert("来自crm",data.msg,"info");
            }
        }
    });
}
function openModifyUserDialog() {
    var rows= $("#dg").datagrid("getSelections");
    if(rows.length==0){
        $.messager.alert("来自crm","请选中待更新记录!","info");
        return;
    }

    if(rows.length>1){
        $.messager.alert("来自crm","只能选择一条记录执行更新!","info");
        return;
    }

    $("#fm").form("load",rows[0]);
    $("#dlg").dialog("open").dialog("setTitle","修改用户记录");
}
