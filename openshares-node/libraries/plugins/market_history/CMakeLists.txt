file(GLOB HEADERS "include/capricorn/market_history/*.hpp")

add_library( capricorn_market_history 
             market_history_plugin.cpp
           )

target_link_libraries( capricorn_market_history capricorn_chain capricorn_app )
target_include_directories( capricorn_market_history
                            PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include" )

if(MSVC)
  set_source_files_properties( market_history_plugin.cpp PROPERTIES COMPILE_FLAGS "/bigobj" )
endif(MSVC)

install( TARGETS
   capricorn_market_history

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
INSTALL( FILES ${HEADERS} DESTINATION "include/capricorn/market_history" )

