"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Check, Package } from "lucide-react"

interface ConfirmationScreenProps {
  customerName: string
  productCode: string
  productName: string
  expiryDate: string
  outgoingQuantity: number
  manufacturer: string // 追加
  expectedQuantity: number // 追加
  stock: number // 追加
  onConfirm: () => void
  onBack: () => void
}

export default function ConfirmationScreen({
  customerName,
  productCode,
  productName,
  expiryDate,
  outgoingQuantity,
  manufacturer, // 追加
  expectedQuantity, // 追加
  stock, // 追加
  onConfirm,
  onBack,
}: ConfirmationScreenProps) {
  // デバッグ用: productNameが正しく渡されているかコンソールで確認
  console.log("ConfirmationScreen received productName:", productName)

  const isQuantityMismatch = outgoingQuantity !== expectedQuantity

  return (
    <div className="flex flex-col w-[480px] h-[800px] border rounded-lg overflow-hidden shadow-lg bg-[#FAF5E9]">
      {/* ヘッダー */}
      <header className="flex items-center justify-between h-14 px-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">照合・確認画面</h1>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 p-4 overflow-auto flex items-start justify-center">
        <Card className="w-full max-w-md bg-[#FAF5E9] p-4 space-y-4">
          {/* 商品情報ヘッダー */}
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-bold">出庫内容確認</h2>
          </div>

          {/* 得意先名 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label className="text-base font-normal">得意先名</Label>
            <span className="text-base font-bold">{customerName}</span>
          </div>
          {/* メーカー */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label className="text-base font-normal">メーカー</Label>
            <span className="text-base font-bold">{manufacturer}</span>
          </div>
          {/* 商品コード */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label className="text-base font-normal">商品コード</Label>
            <span className="text-base font-bold">{productCode}</span>
          </div>
          {/* 商品名 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label className="text-base font-normal">商品名</Label>
            <span className="text-base font-bold">{productName}</span>
          </div>
          {/* 使用期限 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label className="text-base font-normal">使用期限</Label>
            <span className="text-base font-bold">{expiryDate}</span>
          </div>
          {/* 在庫 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label className="text-base font-normal">在庫</Label>
            <span className="text-base font-bold">{stock}</span>
          </div>
          {/* 出庫予定数量 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label className="text-base font-normal">出庫予定数量</Label>
            <span className="text-base font-bold">{expectedQuantity}</span>
          </div>
          {/* 出庫数量 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label className="text-base font-normal">出庫数量</Label>
            <span className={`text-base font-bold ${isQuantityMismatch ? "text-red-500" : ""}`}>
              {outgoingQuantity}
            </span>
          </div>
          {isQuantityMismatch && (
            <p className="text-red-500 text-sm mt-2 text-center">※ 出庫数量が予定数量と異なります。</p>
          )}
        </Card>
      </main>

      {/* フッターボタンエリア */}
      <footer className="p-4 border-t flex justify-around gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>
        <Button onClick={onConfirm} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
          <Check className="mr-2 h-4 w-4" />
          確定
        </Button>
      </footer>
    </div>
  )
}
