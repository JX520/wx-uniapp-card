<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import "./uview-ui/index.scss";
</style>
<style>
	/*每个页面公共css */
@import "colorui/main.css";
@import "colorui/icon.css";
.row{
	display: flex;
	flex-direction: row;
}
.col{
	display: flex;
	flex-direction: column;
}
.rowcenter{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.rowevenly{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
}
.colcenter{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>

