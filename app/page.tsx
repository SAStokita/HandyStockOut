"use client"

import { useState } from "react"
import PickingList from "../picking-list"
import QuantityInput from "../quantity-input"
import ConfirmationScreen from "../confirmation-screen"
import ProductSearch from "../product-search" // 新しいコンポーネントをインポート

export default function Page() {
  const [currentView, setCurrentView] = useState<"pickingList" | "quantityInput" | "confirmation" | "productSearch">(
    "pickingList",
  )
  const [selectedProductData, setSelectedProductData] = useState<any>(null) // ピッキングリストまたは商品検索から選択された商品の情報
  const [inputQuantity, setInputQuantity] = useState<number | null>(null) // 数量入力画面で入力された数量

  // ピッキングリストから商品が選択され、バーコード読み取りボタンが押された時
  const handleScanBarcode = (productData: any) => {
    setSelectedProductData(productData)
    setCurrentView("quantityInput")
  }

  // 数量入力画面でキャンセルボタンが押された時
  const handleCancelQuantityInput = () => {
    // どこから来たかに応じて戻る画面を決定
    if (selectedProductData && selectedProductData.fromSearch) {
      setCurrentView("productSearch") // 検索画面から来た場合は検索画面に戻る
    } else {
      setCurrentView("pickingList") // ピッキングリストから来た場合はピッキングリストに戻る
    }
    setSelectedProductData(null)
    setInputQuantity(null)
  }

  // 数量入力画面で「次へ（確認画面へ）」ボタンが押された時
  const handleNextQuantityInput = (quantity: number) => {
    setInputQuantity(quantity)
    setCurrentView("confirmation")
  }

  // 確認画面で「確定」ボタンが押された時
  const handleConfirm = () => {
    // ここで出庫処理（APIコールなど）を実行
    console.log("出庫確定:", {
      ...selectedProductData,
      inputQuantity: inputQuantity,
    })
    alert("出庫が確定されました！")
    // 処理後、ピッキングリスト画面に戻る
    setCurrentView("pickingList")
    setSelectedProductData(null)
    setInputQuantity(null)
  }

  // 確認画面で「戻る」ボタンが押された時
  const handleBackFromConfirmation = () => {
    setCurrentView("quantityInput")
  }

  // 商品検索ボタンが押された時
  const handleProductSearchClick = () => {
    setCurrentView("productSearch")
  }

  // 商品検索画面で戻るボタンが押された時
  const handleBackFromProductSearch = () => {
    setCurrentView("pickingList")
  }

  // 商品検索画面で商品が選択された時
  const handleProductSelectedFromSearch = (productData: any) => {
    // 検索結果から来たことを示すフラグを追加
    setSelectedProductData({ ...productData, fromSearch: true })
    setCurrentView("quantityInput")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF5E9]">
      {currentView === "pickingList" && (
        <PickingList onScanBarcode={handleScanBarcode} onProductSearch={handleProductSearchClick} />
      )}
      {currentView === "productSearch" && (
        <ProductSearch onProductSelect={handleProductSelectedFromSearch} onBack={handleBackFromProductSearch} />
      )}
      {currentView === "quantityInput" && selectedProductData && (
        <QuantityInput
          product={selectedProductData}
          onCancel={handleCancelQuantityInput}
          onNext={handleNextQuantityInput}
        />
      )}
      {currentView === "confirmation" && selectedProductData && inputQuantity !== null && (
        <ConfirmationScreen
          customerName={selectedProductData.customer || "N/A"} // 検索からの場合はデフォルト値
          productCode={selectedProductData.productCode}
          productName={selectedProductData.productName}
          expiryDate={selectedProductData.expiryDate || "N/A"} // 検索からの場合はデフォルト値
          outgoingQuantity={inputQuantity}
          manufacturer={selectedProductData.manufacturer}
          expectedQuantity={selectedProductData.expectedQuantity || 0} // 検索からの場合はデフォルト値
          stock={selectedProductData.stock || 0} // 検索からの場合はデフォルト値
          onConfirm={handleConfirm}
          onBack={handleBackFromConfirmation}
        />
      )}
    </div>
  )
}
