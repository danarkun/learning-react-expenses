<!DOCTYPE html>
<html>
<body>

Welcome <?php if(isset($_GET["firstname"])) echo $_GET["firstname"]; ?><br>
Your email address is: <?php echo $_GET["lastname"]; ?>

</body>
</html>